import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Check
} from 'typeorm';
import { Goal, DayPlan } from '../entities'
import {Priority, TaskStatus, TaskType} from "@db/types/enams";
import {enumToStrings} from "@db/util/transformer";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    @Check(`priority IN (${enumToStrings(Priority)})`)
    priority: string;

    @Column('text')
    @Check(`taskType IN (${enumToStrings(TaskType)})`)
    taskType: string;

    @Column('text')
    @Check(`status IN (${enumToStrings(TaskStatus)})`)
    status: string;

    @Column('int')
    duration: number;

    @Column('int')
    breakDuration: number;

    @Column('date')
    startDate: Date;

    @Column('date', { nullable: true })
    endDate: Date;

    @ManyToOne(() => Goal, (goal) => goal.tasks)
    @JoinColumn({ name: 'GoalId' })
    GoalId: Goal;

    @ManyToOne(() => DayPlan, (dayPlan) => dayPlan.tasks)
    @JoinColumn({ name: 'dayPlanId' })
    dayPlanId: DayPlan;

    @CreateDateColumn({ type: 'date' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'date' })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'date' })
    deletedAt?: Date;
}