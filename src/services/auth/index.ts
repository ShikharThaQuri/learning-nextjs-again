"use server";

export async function registerUser(previousState: unknown, formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    return await res.json();
  } catch (error) {
    return {
      success: false,
      msg: "Error in registerUser",
      error,
    };
  }
}

export async function loginUser(previousState: unknown, formData: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      success: false,
      msg: "Error in LoginUser",
      error,
    };
  }
}
