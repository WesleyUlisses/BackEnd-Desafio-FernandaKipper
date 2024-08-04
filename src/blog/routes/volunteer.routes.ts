import { Router } from 'express';
import { VolunteerControllers } from '../controllers/volunteer.controllers';

class VolunteerRoutes {
    private readonly router: Router;
    private readonly volunteerController: VolunteerControllers;

    constructor() {
        this.router = Router();
        this.volunteerController = new VolunteerControllers();
    }

    volunteerRoutes() {
        /**
         * @swagger
         * components:
         *   schemas:
         *     Volunteer:
         *       type: object
         *       properties:
         *         name:
         *           type: string
         *           example: John Doe
         *         email:
         *           type: string
         *           example: johndoe@example.com
         *         phone:
         *           type: string
         *           example: +1234567890
         *
         *   responses:
         *     VolunteerCreated:
         *       description: Voluntário criado com sucesso
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               volunteer:
         *                 $ref: '#/components/schemas/Volunteer'
         *               message:
         *                 type: string
         *                 example: "Volunteer created successfully"
         * 
         *     VolunteerFound:
         *       description: Voluntário encontrado
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Volunteer'
         * 
         *     VolunteerUpdated:
         *       description: Voluntário atualizado com sucesso
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Volunteer'
         * 
         *     VolunteerDeleted:
         *       description: Voluntário deletado com sucesso
         *
         * /create-volunteers:
         *   post:
         *     summary: Cria um novo voluntário
         *     tags: [Volunteer]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Volunteer'
         *     responses:
         *       200:
         *         $ref: '#/components/responses/VolunteerCreated'
         *       400:
         *         description: Bad Request
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: volunteer not created
         *
         * /get-volunteers/{id}:
         *   get:
         *     summary: Busca um voluntário por ID
         *     tags: [Volunteer]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID do voluntário
         *     responses:
         *       200:
         *         $ref: '#/components/responses/VolunteerFound'
         *       404:
         *         description: Voluntário não encontrado
         * 
         *  /update-volunteer/${id}
         *   put:
         *     summary: Atualiza um voluntário por ID
         *     tags: [Volunteer]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID do voluntário
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Volunteer'
         *     responses:
         *       200:
         *         $ref: '#/components/responses/VolunteerUpdated'
         *       400:
         *         description: Bad Request
         *
         *   delete:
         *     summary: Deleta um voluntário por ID
         *     tags: [Volunteer]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID do voluntário
         *     responses:
         *       204:
         *         description: No Content
         *       404:
         *         description: Voluntário não encontrado
         *
         * /get-volunteers:
         *   get:
         *     summary: Lista todos os voluntários
         *     tags: [Volunteer]
         *     responses:
         *       200:
         *         description: Lista de voluntários
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Volunteer'
         */
        this.router.post('/create-volunteer', this.volunteerController.createVolunteer.bind(this.volunteerController));
        this.router.get('/get-volunteers/:id', this.volunteerController.getVolunteerById.bind(this.volunteerController));
        this.router.put('/update-volunteer/:id', this.volunteerController.updateVolunteer.bind(this.volunteerController));
        this.router.delete('/delete-volunteer/:id', this.volunteerController.deleteVolunteer.bind(this.volunteerController));
        this.router.get('/get-volunteers', this.volunteerController.getAllVolunteers.bind(this.volunteerController));
        return this.router;
    }
}

export { VolunteerRoutes };
