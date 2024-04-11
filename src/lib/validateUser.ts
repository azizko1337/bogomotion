export function validateUser(
  email: string,
  password: string,
  birthYear: string,
  sex: string,
  placeOfResidence: string
) {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw new Error("Niepoprawny email.");
  }
  // DZIAŁA TYLKO Z ALFABETEM ŁACIŃSKIM
  if (password.length < 8 || password.length > 64) {
    throw new Error(
      "Hasło musi zawierać przynajmniej jedną literę i jedną cyfrę."
    );
  }
  if (!/^\d{4}$/.test(birthYear)) {
    throw new Error("Niepoprawny rok urodzenia.");
  }
  if (sex !== "male" && sex !== "female" && sex !== "other") {
    throw new Error("Niepoprawna płeć.");
  }
  if (
    placeOfResidence !== "village" &&
    placeOfResidence !== "smallCity" &&
    placeOfResidence !== "averageCity" &&
    placeOfResidence !== "bigCity"
  ) {
    throw new Error("Niepoprawne miejsce zamieszkania.");
  }
}

export default validateUser;
