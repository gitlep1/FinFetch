import { createContext } from "react";

const userContext = createContext();
const tokenContext = createContext();
const errorContext = createContext();

export { userContext, tokenContext, errorContext };
