import { makeFirebaseUserRepository } from "./factories/make-firebase-user-repository";

type Add = {
  data: {
    email: string;
  };
};

export async function add({ data }: Add) {
  const firebaseRepository = makeFirebaseUserRepository();

  const user = await firebaseRepository.findUnique({
    field: "email",
    value: data.email,
  });

  if (user) {
    return user;
  }

  await firebaseRepository.create(data);
}
