-module(script).
-export([start/0]). 

start() ->
   inets:start(), 
   Pid = inets:start(httpd, [{port, 80}, {server_name,"httpd_test"}, 
   {server_root,"/tmp"},{document_root,"/tmp"},
   {bind_address, "0.0.0.0"}]), io:fwrite("~p",[Pid]).
