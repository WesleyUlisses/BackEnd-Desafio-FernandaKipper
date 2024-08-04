import { Request, Response, NextFunction } from "express";
import { VolunteerServices } from "../services/volunteer.services";

class VolunteerControllers {
  private readonly volunteerServices: VolunteerServices;

  constructor() {
    this.volunteerServices = new VolunteerServices();
  }

  async createVolunteer(request: Request, response: Response, nextFunction: NextFunction) {
    const { name, email, phone } = request.body;
    const volunteer = await this.volunteerServices.createVolunteer({ name, email, phone });
    return response.status(200).json(volunteer);
  }

  async getVolunteerById(request: Request, response: Response, nextFunction: NextFunction) {
    const { id } = request.params;
    const volunteer = await this.volunteerServices.getVolunteerById(Number(id));
    return response.status(200).json(volunteer);
  }

  async updateVolunteer(request: Request, response: Response, nextFunction: NextFunction) {
    const { id } = request.params;
    const data = request.body;
    const volunteer = await this.volunteerServices.updateVolunteer(Number(id), data);
    return response.status(200).json(volunteer);
  }

  async deleteVolunteer(request: Request, response: Response, nextFunction: NextFunction) {
    const { id } = request.params;
    await this.volunteerServices.deleteVolunteer(Number(id));
    return response.status(204).send();
  }

  async getAllVolunteers(request: Request, response: Response, nextFunction: NextFunction) {
    const volunteers = await this.volunteerServices.getAllVolunteers();
    return response.status(200).json(volunteers);
  }
}

export { VolunteerControllers };
