-module(script).
-export([start/0]).

start() ->
    inets:start(),
    {Httpd_State,Httpd_Pid} = inets:start(httpd, [{port, 80}, {server_name, "0.0.0.0"}, {document_root, "."}, {modules,[mod_esi]},{server_root, "."}, {erl_script_alias, {"/esi", [my_esi, io]}}]).
