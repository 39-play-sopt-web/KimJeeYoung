import axios from "axios";

interface AuthorizationCodeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    authorizationCode: string;
  };
}

export const issueAuthorizationCode = async (part: string) => {
  const response = await axios.post<AuthorizationCodeResponse>(
    "https://playsopt.o-r.kr/api/v1/members/authorization-code",
    { part },
  );

  return response.data.data.authorizationCode;
};
