require 'fastlane/action'
require 'fastlane_core/ui/ui'
require 'dotenv'
require 'spaceship'
require 'google/apis/androidpublisher_v3'
require 'googleauth'

module Fastlane
  module Actions
    class ManageVersionAndBuildAction < Action

      def self.run(params)
        manage_version_and_build(
          params[:platform],
          params[:env_file],
          xcodeproj_path: params[:xcodeproj_path],
          gradle_path: params[:gradle_path]
        )
      end

      def self.description
        "Manage version and build numbers for iOS and Android platforms"
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(key: :platform,
                                       description: "Platform (ios or android)",
                                       optional: false,
                                       type: String),
          FastlaneCore::ConfigItem.new(key: :env_file,
                                       description: "Path to the environment file",
                                       optional: false,
                                       type: String),
          FastlaneCore::ConfigItem.new(key: :xcodeproj_path,
                                       description: "Path to the Xcode project file",
                                       optional: true,
                                       type: String),
          FastlaneCore::ConfigItem.new(key: :gradle_path,
                                       description: "Path to the Gradle file",
                                       optional: true,
                                       type: String)
        ]
      end

      def self.is_supported?(platform)
        [:ios, :android].include?(platform)
      end
    end
  end
end

def manage_version_and_build(platform, env_file, xcodeproj_path: nil, gradle_path: nil)
  env_file = File.expand_path(env_file, __dir__)
  Dotenv.load(env_file)

  application_version = ENV["APPLICATION_VERSION"]
  application_build_number = ENV["APPLICATION_BUILD_NUMBER"]

  if application_version.nil?
    application_version = FastlaneCore::UI.input("Please enter the new application version:")
  end

  if application_build_number.nil?
    application_build_number = 1
  else
    application_build_number = application_build_number.to_i + 1
  end

  if platform == 'ios'
    latest_build_number = get_latest_ios_build_number
    if latest_build_number && latest_build_number >= application_build_number
      application_build_number = latest_build_number + 1
    end

    increment_build_number(
      xcodeproj: xcodeproj_path,
      build_number: application_build_number
    )
    increment_version_number(
      xcodeproj: xcodeproj_path,
      version_number: application_version
    )
  elsif platform == 'android'
    latest_build_number = get_latest_android_build_number
    if latest_build_number && latest_build_number >= application_build_number
      application_build_number = latest_build_number + 1
    end

    increment_version_code(
      gradle_file_path: gradle_path,
      version_code: application_build_number
    )
    increment_version_name(
      gradle_file_path: gradle_path,
      version_name: application_version
    )
  else
    FastlaneCore::UI.user_error!("Unsupported platform: #{platform}")
  end
end

def get_latest_ios_build_number
  api_key_path = File.expand_path("../api_key.p8", __dir__)
  api_key = Spaceship::ConnectAPI::Token.create(
    key_id: ENV["APP_CONNECT_KEY_ID"],
    issuer_id: ENV["APP_CONNECT_ISSUER_ID"],
    filepath: api_key_path
  )
  Spaceship::ConnectAPI.token = api_key

  app = Spaceship::ConnectAPI::App.find(ENV["IOS_APP_IDENTIFIER"])

  begin
    latest_testflight_build = app.get_builds.sort_by(&:uploaded_date).last
    latest_testflight_build_number = latest_testflight_build ? latest_testflight_build.version.to_i : 0
    FastlaneCore::UI.message("Fetched latest TestFlight build number for app: #{latest_testflight_build_number}")
  rescue => e
    FastlaneCore::UI.error("Error fetching latest TestFlight build: #{e.message}")
    latest_testflight_build_number = 0
  end

  firebase_app_id = ENV["IOS_FIREBASE_ID"]
  service_credentials_file = File.expand_path("../google-play-sa.json", __dir__)

  FastlaneCore::UI.message("Fetching latest Firebase build for iOS app ID: #{firebase_app_id}")
  FastlaneCore::UI.message("Using service credentials file: #{service_credentials_file}")

  begin
    latest_firebase_build = firebase_app_distribution_get_latest_release(
      app: firebase_app_id,
      service_credentials_file: service_credentials_file
    )
    latest_firebase_build_number = latest_firebase_build ? latest_firebase_build[:build_version].to_i : 0
  rescue => e
    FastlaneCore::UI.error("Error fetching latest Firebase build: #{e.message}")
    latest_firebase_build_number = 0
  end

  [latest_testflight_build_number, latest_firebase_build_number].max
end

def get_latest_android_build_number
  firebase_app_id = ENV["ANDROID_FIREBASE_ID"]
  service_credentials_file = File.expand_path("../google-play-sa.json", __dir__)

  FastlaneCore::UI.message("Fetching latest Firebase build for Android app ID: #{firebase_app_id}")
  FastlaneCore::UI.message("Using service credentials file: #{service_credentials_file}")

  begin
    latest_firebase_build = firebase_app_distribution_get_latest_release(
      app: firebase_app_id,
      service_credentials_file: service_credentials_file
    )
    latest_firebase_build_number = latest_firebase_build ? latest_firebase_build[:build_version].to_i : 0
  rescue => e
    FastlaneCore::UI.error("Error fetching latest Firebase build: #{e.message}")
    latest_firebase_build_number = 0
  end

  latest_play_console_build_number = get_latest_play_console_build_number

  [latest_firebase_build_number, latest_play_console_build_number].max
end

def get_latest_play_console_build_number
  service_credentials_file = File.expand_path("../google-play-sa.json", __dir__)
  scope = ['https://www.googleapis.com/auth/androidpublisher']
  authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
    json_key_io: File.open(service_credentials_file),
    scope: scope
  )
  service = Google::Apis::AndroidpublisherV3::AndroidPublisherService.new
  service.authorization = authorizer

  package_name = ENV["ANDROID_APP_IDENTIFIER"]

  begin
    edit_id = service.insert_edit(package_name).id
    tracks = service.list_edit_tracks(package_name, edit_id).tracks
    latest_build_number = tracks.flat_map { |track| track.releases.flat_map { |release| release.version_codes } }.max
    latest_build_number = latest_build_number ? latest_build_number.to_i : 0
    FastlaneCore::UI.message("Fetched latest Play Console build number for app: #{latest_build_number}")
  rescue => e
    FastlaneCore::UI.error("Error fetching latest Play Console build: #{e.message}")
    latest_build_number = 0
  end

  latest_build_number
end
