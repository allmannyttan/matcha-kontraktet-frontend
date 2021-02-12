import history from "../utils/history";

export const post = async (path: string, body: object, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`A ${response.status} error has occurred. ${body}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const put = async (path: string, body: object, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`A ${response.status} error has occurred. ${body}`);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const get = async (path: string, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const parsedResponse = await response.json();

    if (response.status === 401 && parsedResponse.message === "jwt expired") {
      history.push("/login");
    }

    if (!response.ok) {
      throw new Error(
        `A ${response.status} error has occurred. ${JSON.stringify(
          parsedResponse,
          null,
          2
        )}`
      );
    }

    return parsedResponse;
  } catch (err) {
    console.log(err);
  }
};

export const del = async (path: string, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const parsedResponse = await response.json();

    if (response.status === 401 && parsedResponse.message === "jwt expired") {
      history.push("/login");
    }

    if (!response.ok) {
      throw new Error(
        `A ${response.status} error has occurred. ${JSON.stringify(
          parsedResponse,
          null,
          2
        )}`
      );
    }

    return parsedResponse;
  } catch (err) {
    console.log(err);
  }
};
