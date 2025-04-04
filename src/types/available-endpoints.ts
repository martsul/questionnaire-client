import { endpoints } from "../constants/config";

export type AvailableEndpoints = typeof endpoints[keyof typeof endpoints];
