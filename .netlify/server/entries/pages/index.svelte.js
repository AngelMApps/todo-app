var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Routes
});
var import_index_c8dcedc4 = __toModule(require("../../chunks/index-c8dcedc4.js"));
var import_app = __toModule(require("firebase/compat/app"));
var import_auth = __toModule(require("firebase/compat/auth"));
var import_firestore = __toModule(require("firebase/compat/firestore"));
var firebaseConfig = {
  apiKey: "AIzaSyBFiJP-PVV8jCljNq62nquoTVkl46Vsldw",
  authDomain: "todo-app123456.firebaseapp.com",
  projectId: "todo-app123456",
  storageBucket: "todo-app123456.appspot.com",
  messagingSenderId: "247179786644",
  appId: "1:247179786644:web:e7bfd14c05ec40a918f781",
  measurementId: "G-MSVMZG1NXR"
};
import_app.default.initializeApp(firebaseConfig);
import_app.default.auth();
new import_app.default.auth.GoogleAuthProvider();
import_app.default.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    import_app.default.auth().onAuthStateChanged((user2) => {
      resolve(user2);
    }, reject);
  });
};
const db = import_app.default.firestore();
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = import_index_c8dcedc4.n) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if ((0, import_index_c8dcedc4.a)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_c8dcedc4.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_c8dcedc4.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = import_index_c8dcedc4.n;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = (0, import_index_c8dcedc4.i)(result) ? result : import_index_c8dcedc4.n;
      }
    };
    const unsubscribers = stores_array.map((store, i) => (0, import_index_c8dcedc4.b)(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      (0, import_index_c8dcedc4.r)(unsubscribers);
      cleanup();
    };
  });
}
const createUser = () => {
  const { subscribe: subscribe2, set } = writable(false);
  return {
    subscribe: subscribe2,
    setUser: (user2) => {
      set(user2);
    },
    current: async () => {
      const user2 = await import_app.default.getCurrentUser();
      set(user2);
    }
  };
};
const user = createUser();
var Profile_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "section.svelte-esy5mq{display:flex;flex-direction:column;align-items:center;height:100%;padding-bottom:15px}button.svelte-esy5mq{border:none;cursor:pointer;width:100%;background-color:rgb(123, 214, 169);border-radius:20px;color:black;height:35px}button.svelte-esy5mq,i.svelte-esy5mq{font-size:20pt}button.svelte-esy5mq:hover{background-color:rgb(21, 138, 128);color:white;border-radius:20px}",
  map: null
};
const Profile = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  let { displayName } = $$props;
  let { photoURL } = $$props;
  let { uid } = $$props;
  if ($$props.displayName === void 0 && $$bindings.displayName && displayName !== void 0)
    $$bindings.displayName(displayName);
  if ($$props.photoURL === void 0 && $$bindings.photoURL && photoURL !== void 0)
    $$bindings.photoURL(photoURL);
  if ($$props.uid === void 0 && $$bindings.uid && uid !== void 0)
    $$bindings.uid(uid);
  $$result.css.add(css$5);
  return `<section class="${"svelte-esy5mq"}"><h3>Hola ${(0, import_index_c8dcedc4.e)(displayName)}!</h3>
	<img${(0, import_index_c8dcedc4.d)("src", photoURL, 0)} width="${"100"}" alt="${"user avatar"}">
	<p>Tu userID es ${(0, import_index_c8dcedc4.e)(uid)}</p>
	<button class="${"svelte-esy5mq"}">Logout <i class="${"fas fa-sign-out-alt svelte-esy5mq"}"></i></button>
</section>`;
});
var Navbar_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "nav.svelte-1xxq0mq{position:fixed;left:0;right:0;top:0;margin:0px;padding:0px 10px;line-height:50px;width:100%;background-color:rgb(122, 158, 150);height:55px;display:flex;flex-direction:row;justify-content:space-between;align-items:center;z-index:2}strong.svelte-1xxq0mq{font-size:30pt;color:#fff;padding:0px;margin:0px;text-align:center}i.svelte-1xxq0mq{display:flex;flex-direction:column;justify-content:center;font-size:40px}.fa-times.svelte-1xxq0mq:hover{color:rgb(66, 109, 95)}img.svelte-1xxq0mq{border-radius:27px;height:100%;height:47px;cursor:pointer}img.svelte-1xxq0mq:hover{filter:brightness(0.5)}div.svelte-1xxq0mq{position:absolute;top:55px;padding:0px;background-color:rgb(85, 112, 106);width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:1}.profile-div__hide.svelte-1xxq0mq{left:-1420px;transition:left 0.3s}.profile-div__show.svelte-1xxq0mq{left:0;transition:left 0.3s}",
  map: null
};
const Navbar = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  let { iUser = null } = $$props;
  let name = "";
  let iURL = "";
  let uID = "";
  if (iUser != null) {
    name = iUser.displayName;
    iURL = iUser.photoURL;
    uID = iUser.uid;
  }
  if ($$props.iUser === void 0 && $$bindings.iUser && iUser !== void 0)
    $$bindings.iUser(iUser);
  $$result.css.add(css$4);
  return `<nav class="${"svelte-1xxq0mq"}"><strong href="${"/"}" class="${"svelte-1xxq0mq"}">TodoApp</strong>
	${iUser != null ? `${`<img${(0, import_index_c8dcedc4.d)("src", iUser.photoURL, 0)} alt="${"user"}" class="${"svelte-1xxq0mq"}">`}` : `<i class="${"fas fa-user-circle svelte-1xxq0mq"}"></i>`}
	<div class="${(0, import_index_c8dcedc4.e)((0, import_index_c8dcedc4.f)("profile-div__hide")) + " svelte-1xxq0mq"}">${(0, import_index_c8dcedc4.v)(Profile, "Profile").$$render($$result, {
    displayName: name,
    photoURL: iURL,
    uid: uID
  }, {}, {})}</div>
</nav>`;
});
function createNotificationStore(timeout) {
  const _notifications = writable([]);
  function send(message, type = "default", timeout2) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout: timeout2 }];
    });
  }
  const notifications2 = derived(_notifications, ($_notifications, set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  const { subscribe: subscribe2 } = notifications2;
  return {
    subscribe: subscribe2,
    send,
    default: (msg, timeout2) => send(msg, "default", timeout2),
    danger: (msg, timeout2) => send(msg, "danger", timeout2),
    warning: (msg, timeout2) => send(msg, "warning", timeout2),
    info: (msg, timeout2) => send(msg, "info", timeout2),
    success: (msg, timeout2) => send(msg, "success", timeout2)
  };
}
function id() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
const notifications = createNotificationStore();
var Toast_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".notifications.svelte-hn7zr7{position:fixed;bottom:30px;right:10px;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}.toast.svelte-hn7zr7{flex:0 0 auto;text-align:center;margin-bottom:10px;width:170px}.content.svelte-hn7zr7{padding:10px;display:block;color:white;font-size:16pt;font-weight:500}",
  map: null
};
const Toast = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = (0, import_index_c8dcedc4.b)(notifications, (value) => $notifications = value);
  let { themes = {
    danger: "#E26D69",
    success: "#84C991",
    warning: "#f0ad4e",
    info: "#5bc0de",
    default: "rgb(122, 158, 150)"
  } } = $$props;
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  $$result.css.add(css$3);
  $$unsubscribe_notifications();
  return `<div class="${"notifications svelte-hn7zr7"}">${(0, import_index_c8dcedc4.g)($notifications, (notification) => `<div class="${"toast svelte-hn7zr7"}" style="${"background: " + (0, import_index_c8dcedc4.e)(themes[notification.type]) + ";"}"><div class="${"content svelte-hn7zr7"}">${(0, import_index_c8dcedc4.e)(notification.message)}</div>
			${notification.icon ? `<i class="${(0, import_index_c8dcedc4.e)((0, import_index_c8dcedc4.f)(notification.icon)) + " svelte-hn7zr7"}"></i>` : ``}
		</div>`)}
</div>`;
});
var Todo_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "main.svelte-1wpjchw{width:100%;height:100%}.content-p.svelte-1wpjchw{word-break:break-all}.fa-paper-plane.svelte-1wpjchw{padding:0px;margin:0px;font-size:20px}.fa-check-square.svelte-1wpjchw,.fa-square.svelte-1wpjchw{font-size:30px;color:rgb(112, 214, 172)}.div-form.svelte-1wpjchw{margin-top:58px;padding:10px;display:flex;flex-direction:row;align-items:center;justify-content:center;transition:top 1s;z-index:1;height:60%}.input-todo.svelte-1wpjchw{border-radius:35px;padding:40px;margin:0px;width:100%;height:100%;color:#fff}.btn-floating.svelte-1wpjchw{margin-left:10px;display:flex;justify-content:center;align-items:center;background-color:rgb(124, 192, 152);width:50px;height:45px}.Todos-div.svelte-1wpjchw{margin-top:10px}",
  map: null
};
const Todo = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  let { uid } = $$props;
  let text = "";
  let tasks = [];
  db.collection("todos").where("uid", "==", uid).orderBy("created").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push(__spreadProps(__spreadValues({}, doc.data()), { id: doc.id }));
    });
    tasks = [...docs];
  });
  if ($$props.uid === void 0 && $$bindings.uid && uid !== void 0)
    $$bindings.uid(uid);
  $$result.css.add(css$2);
  return `<main class="${"svelte-1wpjchw"}"><div class="${"div-form svelte-1wpjchw"}"><input class="${"input-todo svelte-1wpjchw"}" type="${"text"}" placeholder="${"Nueva Tarea"}" style="${"border: solid 1.5px rgb(124, 192, 152); margin: 0px;border-radius: 15px; padding: 10px;width: 100%; height: 100%;color: #fff;"}"${(0, import_index_c8dcedc4.d)("value", text, 0)}>
		<button class="${"btn-floating btn-large waves-effect waves-light svelte-1wpjchw"}" type="${"submit"}" name="${"action"}"><i class="${"fas fa-paper-plane svelte-1wpjchw"}"></i></button></div>

	<div class="${"Todos-div row svelte-1wpjchw"}">${(0, import_index_c8dcedc4.g)(tasks, (todo) => `<div${(0, import_index_c8dcedc4.d)("class", todo.complete == false ? "col s12 m6 l3 animate__animated animate__zoomInUp animate__slows" : "col s12 m6 l3 animate__animated animate__zoomOut animate__slower", 0)}><div class="${"card horizontal"}"><div class="${"card-stacked"}"><div class="${"card-content"}"><p class="${"content-p svelte-1wpjchw"}">${(0, import_index_c8dcedc4.e)(todo.text)}</p></div>
						<div class="${"card-action center-align"}"><p><i class="${(0, import_index_c8dcedc4.e)((0, import_index_c8dcedc4.f)(todo.complete == false ? "far fa-square" : "far fa-check-square")) + " svelte-1wpjchw"}"></i>
								<span>Hecho</span>
							</p></div>
					</div></div>
			</div>`)}</div>

	${(0, import_index_c8dcedc4.v)(Toast, "Toast").$$render($$result, {}, {}, {})}
</main>`;
});
var loaderPage_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".center.svelte-1bmr9af{display:flex;text-align:center;justify-content:center;align-items:center;min-height:100vh}.ring.svelte-1bmr9af{position:absolute;width:200px;height:200px;border-radius:50%;animation:svelte-1bmr9af-ring 2s linear infinite}@keyframes svelte-1bmr9af-ring{0%{transform:rotate(0deg);box-shadow:1px 5px 2px #e65c00}50%{transform:rotate(180deg);box-shadow:1px 5px 2px #18b201}100%{transform:rotate(360deg);box-shadow:1px 5px 2px #0456c8}}.ring.svelte-1bmr9af:before{position:absolute;content:'';left:0;top:0;height:100%;width:100%;border-radius:50%;box-shadow:0 0 5px rgba(255,255,255,.3)}span.svelte-1bmr9af{color:#737373;font-size:20px;text-transform:uppercase;letter-spacing:1px;line-height:200px;animation:svelte-1bmr9af-text 3s ease-in-out infinite}@keyframes svelte-1bmr9af-text{50%{color:black}}",
  map: null
};
const LoaderPage = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `
<div class="${"center svelte-1bmr9af"}"><div class="${"ring svelte-1bmr9af"}"></div>
    <span class="${"svelte-1bmr9af"}">loading...</span></div>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1acf5qf{width:100%;height:100%}div.svelte-1acf5qf{width:100%;display:flex;justify-content:center}button.svelte-1acf5qf{border:none;margin-top:100px;cursor:pointer;width:70%;background-color:rgb(123, 214, 169);border-radius:20px;color:black;height:40px;font-size:20pt}button.svelte-1acf5qf:hover{background-color:rgb(21, 138, 128);color:white;border-radius:20px}@media only screen and (max-width: 430px){button.svelte-1acf5qf{width:90%;font-size:20pt}}@media only screen and (max-width: 336px){button.svelte-1acf5qf{width:90%;font-size:15pt}}",
  map: null
};
const Routes = (0, import_index_c8dcedc4.c)(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = (0, import_index_c8dcedc4.b)(user, (value) => $user = value);
  $$result.css.add(css);
  $$unsubscribe_user();
  return `<main class="${"svelte-1acf5qf"}"><section>${$user === false ? `${(0, import_index_c8dcedc4.v)(LoaderPage, "LoaderPage").$$render($$result, {}, {}, {})}` : `${$user === null ? `${(0, import_index_c8dcedc4.v)(Navbar, "Navbar").$$render($$result, {}, {}, {})}
			<div class="${"svelte-1acf5qf"}"><button class="${"center-align svelte-1acf5qf"}"><i class="${"fab fa-google"}"></i> Signin with Google
				</button></div>` : `
			${(0, import_index_c8dcedc4.v)(Navbar, "Navbar").$$render($$result, { iUser: $user }, {}, {})}
			${(0, import_index_c8dcedc4.v)(Todo, "Todos").$$render($$result, { uid: $user.uid }, {}, {})}`}`}</section>
</main>`;
});
