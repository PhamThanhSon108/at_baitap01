import { Button, notification, Space } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

export const publicToast = ({
  type,
  message,
  description,
}: {
  type: NotificationType;
  message: string;
  description: string;
}) => {
  notification[type]({
    message,
    description,
    duration: 2,
  });
};
