<template>
  <div class="container">
    <h3 class="text-center mt-4 mb-6">VueChat</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar" placeholder="Search" />
                <span class="input-group-addon">
                  <button type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>
                    Test, which is a new approach to have all solutions
                    astrology under one roof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mesgs">
          <div class="msg_history">
            <div
              class="incoming_msg"
              v-for="message in messages"
              :key="message.id"
            >
              <div class="incoming_msg_img">
                <img
                  src="https://ptetutorials.com/images/user-profile.png"
                  alt="sunil"
                />
              </div>
              <div
                :class="[
                  message.author === authUser.displayName
                    ? 'sent_msg'
                    : 'received_msg',
                ]"
              >
                <div class="received_withd_msg">
                  <p>{{ message.message }}</p>
                  <span class="time_date"
                    >{{ message.createdAt }}, {{ message.author }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <input
                v-model="message"
                @keyup.enter="saveMessage"
                type="text"
                class="write_msg"
                placeholder="Type a message"
              />
              <button class="msg_send_btn" type="button">
                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

export default {
  setup() {
    const allMessages = ref([]);
    const messages = ref([]);
    const message = ref(null);
    let authUser = ref({});

    async function saveMessage() {
      try {
        const docRef = await addDoc(collection(db, "chat"), {
          message: message.value,
          author: authUser,
          createdAt: new Date(),
        }).then(() => {
          // call the scroll bottom fucntion once a user sends a message
          scrollBottom();
        });
        message.value = null;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // ### this method here shows data only on reload
    // async function fetchMessage() {
    //   let allMessages = [];
    //   const q = query(collection(db, "chat"), orderBy('createdAt'));
    //   const querySnapshot = await getDocs(q);
    //   // create variables
    //   querySnapshot.forEach((doc) => {
    //     allMessages.push({
    //       id: doc.id,
    //       message: doc.data().message,
    //     });
    //   });
    //   // console.log("allMessages:", allMessages);

    //   // return  the allMessages array once the loop is done
    //   messages.value = allMessages;
    // }

    // ### use the onsnapshot here to show data in real time
    async function fetchMessage() {
      let allMessages = [];
      const q = query(collection(db, "chat"), orderBy("createdAt"));
      onSnapshot(q, (snap) => {
        snap.forEach((doc) => {
          allMessages.push({
            id: doc.id,
            message: doc.data().message,
            createdAt: doc.data().createdAt.toDate().toDateString(),
            author: doc.data().author,
          });
        });
        messages.value = allMessages;
        setTimeout(() => {
          scrollBottom();
        }, 1000);
      });
    }

    // scroll to bottom
    function scrollBottom() {
      let box = document.querySelector(".msg_history");
      box.scrollTop = box.scrollHeight;
    }

    onMounted(() => {
      const auth = getAuth();
      const user = auth.currentUser;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          authUser = user.displayName;
        } else {
          authUser = {};
        }
      });
      fetchMessage();
    });

    return {
      saveMessage,
      message,
      allMessages,
      messages,
      fetchMessage,
      authUser,
      scrollBottom,
    };
  },
};
</script>

<style scoped>
.container {
  /* max-width: 1170px; */
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #e5e8e8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #e5e8e8;
}
.inbox_msg {
  border: 1px solid #e5e8e8;
  clear: both;
  overflow: hidden;
  border-radius: 12px;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #e5e8e8;
}

.recent_heading h4 {
  color: #151339;
  font-size: 21px;
  margin: auto;
  font-weight: bold;
}
.srch_bar input {
  border: 1px solid #e5e8e8;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #151339;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 8px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background: #151339 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
  margin: 26px 0 26px;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>
