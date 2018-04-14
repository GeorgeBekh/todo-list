# My website
## About
I host my hobby projects on this website.
You can get the source code [here](https://github.com/GeorgeBekh/web-projects)
## My projects
 * [To-Do List](:8080/registration) - a little project with authentication and persistent storage.
   * React
   * Webpack
   * PHP (Phalcon framework)
   * PostgreSQL
   * Nginx


<script type="text/javascript">
        document.addEventListener('click', function(event) {
                                       var target = event.target;
        if (target.tagName.toLowerCase() == 'a')
            {
                    var port = target.getAttribute('href').match(/^:(\d+)(.*)/);
                        if (port)
                            {
                                    target.href = port[2];
                                        target.port = port[1];
                                    }
                        }
        }, false);
</script>
