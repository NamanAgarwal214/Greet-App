import { FLASHMESSAGE, REMOVEFLASHMESSAGE } from "../constants";

export const flashMessage = (alert) => {
  return {
    type: FLASHMESSAGE,
    payload: alert
  }
}

export const removeAlert = () => {
  return {
    type: REMOVEFLASHMESSAGE
  }
}