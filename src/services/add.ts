import { makeFirebaseRepository } from "./factories/make-firebase-repository";

type Add = {
  data: {
    email: string;
  };
};

export async function add({ data }: Add) {
  const firebaseRepository = makeFirebaseRepository();

  const user = await firebaseRepository.findUnique({
    data: {
      field: "email",
      value: data.email,
    },
  });

  if (user) {
    return user;
  }

  await firebaseRepository.create(data);
}
