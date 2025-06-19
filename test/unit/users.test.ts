import {User} from "../../src/classes/entities/User";
import {UserAdapter} from "../../src/classes/adapter/UserAdapter";

describe("Testing UsersAdapter", () => {
    test("Get users", () => {
        let user = UserAdapter.getIdFromArgument(["some", "[id1|Some user]"], 1, false);
        expect(user!.userId).toBe(1)

        user = UserAdapter.getIdFromArgument(["[club1|Some club]"], 0, false);
        expect(user).toBeNull();

        user = UserAdapter.getIdFromArgument(["[club1|Some club]"], 0, true);
        expect(user).not.toBeNull();

        user = UserAdapter.getIdFromArgument(["Hi", "!"], 1, true);
        expect(user).toBeNull();
    })
})