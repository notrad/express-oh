import type { Express } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { errorHandler } from "./errorHandler";
