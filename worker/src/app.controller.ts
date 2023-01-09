import { Body, Controller, Get, Post } from "@nestjs/common";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { AppService } from "./app.service";

@Controller()
export class AppController {}
