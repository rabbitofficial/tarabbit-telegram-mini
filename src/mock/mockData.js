import { every } from "underscore";

const myData = {
  test: {
    ok: "123",
  },
};

const tarotRules = {
  flip_card_deduction: 50,
  roll_added_points: 100,
  every_day_sent_rolls: 10,
  default_question_list: [
    "What’s My Fortune Today 1?",
    "What’s My Fortune Today 2?",
    "What’s My Fortune Today 3?",
    "What’s My Fortune Today 4?",
  ],
};

const statistics = {
  total_points: 10000, // added all user points together
};

const userDB = {
  id: "1", // nature id, auto increment
  tg_id: "123456",
  name: "John Doe",
  email: "john.doe@example.com",
  points: 1500,
  level: 2,
  group: "normal",
  left_roll_times: 5,
  total_rolled_times: 100,
  created_at: "2024-05-20T12:34:56Z",
  first_name: "a",
  last_name: "b",
  username: "c",
  invited_total_friends: 100,
  invited_normal_friends: 90,
  invited_premium_friends: 10,
  tarot_requested_times: 9,
  language_code: "zh-hans",
  joined_community: true,
  joined_X: true,
  is_premium: false,
  photo_url: "ssssss/ssss.png",
  update_at: "2024-05-20T12:34:56Z", // when update info, created time
};

const Referral = {
  id: "789012",
  referrer_id: "123456",
  referred_id: "654321",
  status: "completed",
  created_at: "2024-05-21T08:15:30Z",
};

export default myData;
