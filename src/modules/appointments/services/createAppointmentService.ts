import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/*
    Single Responsability Principle
    Open Closed Principle
    Liskov Substituiton Principle
    Interface Segregation Principle
    Dependency Inversion
 */

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject('AppointmentsRepository')
    appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentWithSameProvider =
      await this.appointmentsRepository.findByProvider({ provider_id });

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentWithSameProvider) {
      if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
      }
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
