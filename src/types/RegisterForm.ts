type RegisterForm = {
  email: string;
  password: string;
  birthYear: number;
  sex: "male" | "female" | "other";
  additionalInformation: string;
};

export default RegisterForm;
