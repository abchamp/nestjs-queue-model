import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'log_id',
  })
  id: number;

  @Column({
    nullable: true,
  }) desc: string;

  // @Column({
  //   name: 'email_addresss',
  //   nullable: false,
  //   default: '',
  // })
  // emailAddress: string;
}
