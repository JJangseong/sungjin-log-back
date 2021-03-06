import * as bcrypt from "bcryptjs";

import { ResolverMap } from '../../../types/graphql-utils';
import { User } from '../../../entity/User';

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      {
        email,
        password,
        age,
        imgUrl,
        introduce,
        name,
      }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword,
        age,
        imgUrl,
        introduce,
        name,
      });

      await user.save();
      return true;
    },
  },
};
