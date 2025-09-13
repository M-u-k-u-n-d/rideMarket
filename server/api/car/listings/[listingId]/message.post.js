import { prisma } from "~/server/prisma"; // singleton Prisma client
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().min(3).max(30).required(),
  message: Joi.string().min(10).max(300).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const listingId = getRouterParam(event, "listingId"); // safer way

  // Validate body
  const { error } = schema.validate(body);
  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const { message, email, name, phone } = body;

  try {
    const newMessage = await prisma.message.create({
      data: {
        message,
        email,
        name,
        phone,
        listingId: parseInt(listingId),
      },
    });

    return {
      success: true,
      message: "Message submitted successfully",
      data: newMessage,
    };
  } catch (err) {
    console.error("Error saving message:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save message",
    });
  }
});
