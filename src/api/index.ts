import axios from "axios";
import { url_base } from "../utils/consts";

export const Axios = axios.create({baseURL:url_base});