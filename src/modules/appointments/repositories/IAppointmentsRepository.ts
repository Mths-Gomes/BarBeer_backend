import Appointment from '../infra/typeorm/entities/appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByProvider(provider_id: object): Promise<Appointment | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
