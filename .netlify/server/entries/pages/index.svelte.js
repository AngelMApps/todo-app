var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_index_e0d6c709 = __toModule(require("../../chunks/index-e0d6c709.js"));
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = import_index_e0d6c709.n) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if ((0, import_index_e0d6c709.a)(value, new_value)) {
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
  function subscribe2(run, invalidate = import_index_e0d6c709.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_e0d6c709.n;
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
    let cleanup = import_index_e0d6c709.n;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = (0, import_index_e0d6c709.i)(result) ? result : import_index_e0d6c709.n;
      }
    };
    const unsubscribers = stores_array.map((store, i) => (0, import_index_e0d6c709.b)(store, (value) => {
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
      (0, import_index_e0d6c709.r)(unsubscribers);
      cleanup();
    };
  });
}
var Navbar_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "nav.svelte-15oholl{position:fixed;left:0;right:0;top:0;margin:0px;padding:0px 10px;line-height:50px;width:100%;background-color:rgb(122, 158, 150);height:55px;display:flex;flex-direction:row;justify-content:space-between;align-items:stretch;z-index:2}strong.svelte-15oholl{font-size:30pt;color:#fff;padding:0px;margin:0px;text-align:center}",
  map: null
};
const Navbar = (0, import_index_e0d6c709.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `

<nav class="${"svelte-15oholl"}"><strong href="${"/"}" class="${"svelte-15oholl"}">TodoApp</strong>
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
const css$1 = {
  code: ".notifications.svelte-hn7zr7{position:fixed;bottom:30px;right:10px;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none}.toast.svelte-hn7zr7{flex:0 0 auto;text-align:center;margin-bottom:10px;width:170px}.content.svelte-hn7zr7{padding:10px;display:block;color:white;font-size:16pt;font-weight:500}",
  map: null
};
const Toast = (0, import_index_e0d6c709.c)(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = (0, import_index_e0d6c709.b)(notifications, (value) => $notifications = value);
  let { themes = {
    danger: "#E26D69",
    success: "#84C991",
    warning: "#f0ad4e",
    info: "#5bc0de",
    default: "rgb(122, 158, 150)"
  } } = $$props;
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  $$result.css.add(css$1);
  $$unsubscribe_notifications();
  return `<div class="${"notifications svelte-hn7zr7"}">${(0, import_index_e0d6c709.d)($notifications, (notification) => `<div class="${"toast svelte-hn7zr7"}" style="${"background: " + (0, import_index_e0d6c709.e)(themes[notification.type]) + ";"}"><div class="${"content svelte-hn7zr7"}">${(0, import_index_e0d6c709.e)(notification.message)}</div>
			${notification.icon ? `<i class="${(0, import_index_e0d6c709.e)((0, import_index_e0d6c709.f)(notification.icon)) + " svelte-hn7zr7"}"></i>` : ``}
		</div>`)}
</div>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-1kapbr7{width:100%;height:100%}.content-p.svelte-1kapbr7{word-break:break-all}.fa-paper-plane.svelte-1kapbr7{padding:0px;margin:0px;font-size:20px}.fa-check-square.svelte-1kapbr7,.fa-square.svelte-1kapbr7{font-size:30px;color:rgb(112, 214, 172)}.div-form.svelte-1kapbr7{margin-top:80px;padding:10px;display:flex;flex-direction:row;align-items:center;justify-content:center;transition:top 1s;z-index:1;height:60%}.input-todo.svelte-1kapbr7{border-radius:35px;padding:40px;margin:0px;width:100%;height:100%;color:#fff}.btn-floating.svelte-1kapbr7{margin-left:10px;display:flex;justify-content:center;align-items:center;background-color:rgb(124, 192, 152);width:50px;height:45px}.Todos-div.svelte-1kapbr7{margin-top:10px}",
  map: null
};
const Routes = (0, import_index_e0d6c709.c)(($$result, $$props, $$bindings, slots) => {
  let doTodo = "";
  let listTodo = [{ Do: "Prueba", status: false }];
  $$result.css.add(css);
  return `<main class="${"svelte-1kapbr7"}">${(0, import_index_e0d6c709.v)(Navbar, "Navbar").$$render($$result, {}, {}, {})}

	<div class="${"div-form svelte-1kapbr7"}"><input class="${"input-todo svelte-1kapbr7"}" type="${"text"}" placeholder="${"Nueva Tarea"}" style="${"border: solid 1.5px rgb(124, 192, 152); margin: 0px;border-radius: 15px; padding: 10px;width: 100%; height: 100%;color: #fff;"}"${(0, import_index_e0d6c709.g)("value", doTodo, 0)}>
		<button class="${"btn-floating btn-large waves-effect waves-light svelte-1kapbr7"}" type="${"submit"}" name="${"action"}"><i class="${"fas fa-paper-plane svelte-1kapbr7"}"></i></button></div>

	<div class="${"Todos-div row svelte-1kapbr7"}">${(0, import_index_e0d6c709.d)(listTodo, (lT, index) => `<div${(0, import_index_e0d6c709.g)("class", lT.status == false ? "col s12 m6 l3 animate__animated animate__zoomInUp animate__slows" : "col s12 m6 l3 animate__animated animate__zoomOut animate__slower", 0)}><div class="${"card horizontal"}"><div class="${"card-stacked"}"><div class="${"card-content"}"><p class="${"content-p svelte-1kapbr7"}">${(0, import_index_e0d6c709.e)(lT.Do)}</p></div>
						<div class="${"card-action center-align"}"><p><i class="${(0, import_index_e0d6c709.e)((0, import_index_e0d6c709.f)(lT.status == false ? "far fa-square" : "far fa-check-square")) + " svelte-1kapbr7"}"></i>
								<span>Hecho</span>
							</p></div>
					</div></div>
			</div>`)}</div>

	${(0, import_index_e0d6c709.v)(Toast, "Toast").$$render($$result, {}, {}, {})}
</main>`;
});
