
type t

@val external aHook: t = "aHook"

type response
type hookResponse = response => unit

type request
type hookRequest = request => unit

type config = {hookResponse: option<hookResponse>, hookRequest: option<hookRequest>}

@send external register: (t, Js.Re.t, config) => unit = "register"
