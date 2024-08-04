import { VolunteerDals } from '../database/repositories/volunteer.repositories/volunteer.repositories.ts/volunteer.dals'
import { IVolunteerCreate } from '../interfaces/volunteer.interfaces';
import { BadRequestError } from '../helpers/error.helpers';

class VolunteerServices {
  private readonly volunteerDals: VolunteerDals;

  constructor() {
    this.volunteerDals = new VolunteerDals();
  }

  async createVolunteer(data: IVolunteerCreate) {
    const volunteer = await this.volunteerDals.createVolunteer(data);
    if (!volunteer) {
      throw new BadRequestError({ message: "Volunteer not created" });
    }
    return volunteer;
  }

  async getVolunteerById(id: number) {
    const volunteer = await this.volunteerDals.getVolunteerById(id);
    if (!volunteer) {
      throw new BadRequestError({ message: "Volunteer not found" });
    }
    return volunteer;
  }

  async updateVolunteer(id: number, data: Partial<IVolunteerCreate>) {
    const volunteer = await this.volunteerDals.updateVolunteer(id, data);
    if (!volunteer) {
      throw new BadRequestError({ message: "Volunteer not updated" });
    }
    return volunteer;
  }

  async deleteVolunteer(id: number) {
    const volunteer = await this.volunteerDals.deleteVolunteer(id);
    if (!volunteer) {
      throw new BadRequestError({ message: "Volunteer not deleted" });
    }
    return volunteer;
  }

  async getAllVolunteers() {
    return await this.volunteerDals.getAllVolunteers();
  }
}

export { VolunteerServices };
