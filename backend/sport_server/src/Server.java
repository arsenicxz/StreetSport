import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.sql.SQLException;

public class Server {
    //сервер
    private HttpServer _server = null;

    //переменные для базы данных
    /*private HttpServer server = null;
    private static final String db_addr = "jdbc:mysql://localhost:3306";
    private static final String db_user = "root";
    private static final String db_password = "qwerty123";*/

    //создание сервера
    public Server () throws IOException {
        _server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);
        System.out.println("server started at port 8001 (localhost)");

        //ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);

        _server.createContext("/", new MyHttpHandler() {
            @Override
            public int HandleHtml(String request, StringBuilder answer, String request_url) {
                return 0;
            }
        });
        _server.createContext("/login", new LoginHandler());
        _server.createContext("/reg", new NewUserHandler());

        //_server.createContext("/", new RootHandler());

        //_server.setExecutor(threadPoolExecutor);
        _server.setExecutor(null);

    }

    //запуск сервера
    public void start() {
        _server.start();
    }

    //хендлер для принятия запросов на сервер
    abstract static class MyHttpHandler implements HttpHandler {

        public abstract int HandleHtml(String request, StringBuilder answer, String request_url);

        public void handle (HttpExchange t) throws IOException {
            String reguest_url = t.getRequestURI().toString();
            System.out.println("Reguest URL : " + reguest_url);
            String requestMethod = t.getRequestMethod();
            InputStream is; //используем для чтения данных запроса
            String requestString = "";
            if (requestMethod.equalsIgnoreCase("POST")) {
                try {
                    StringBuilder requestBuffer = new StringBuilder();
                    is = t.getRequestBody();
                    int rByte;
                    while ((rByte = is.read()) != -1) {
                        requestBuffer.append((char) rByte);
                    }
                    is.close();
                    if (requestBuffer.length() > 0) {
                        requestString = URLDecoder.decode(requestBuffer.toString(), "UTF-8");
                    } else {
                        requestString = null;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            String response = "Error";
            StringBuilder answer = new StringBuilder();
            HandleHtml(requestString, answer, reguest_url);
            response = answer.toString();

            ByteBuffer buffer = Charset.forName("UTF-8").encode(response);
            byte[] bytes = new byte[buffer.remaining()];
            buffer.get(bytes);

            t.sendResponseHeaders(200, bytes.length);
            OutputStream os = t.getResponseBody();
            try {
                os.write(bytes);
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
            os.close();
        }
    }

    //авторизация пользователя
    public static class LoginHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //String s = "mod=CheckUserAuth&login=krosh&password=qwerty";
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append("Success");
            return 200;
        }

        private String ParceRequest (String request) {
            String[] subs = request.split("&");
            if (subs[0].contains("CheckUserAuth")) {
                String login = subs[1].split("=")[1];
                String password = subs[2].split("=")[2];
                if (login != null && password != null && !login.equals("") && !password.equals("")) {
                    if (_dataBase.CheckUserAuth(login, password)) {
                        return "user authed";
                    } else {
                        return "Error1";
                    }
                } else {
                    return "Error2";
                }
            } else {
                return "Error3";
            }
        }
    }


    //регистрация пользователя
    public static class NewUserHandler extends MyHttpHandler {
        DataBase _dataBase;
        @Override
        public int HandleHtml(String request, StringBuilder answer, String request_url) {
            try {
                _dataBase = new DataBase();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            answer.append("Success");
            return 200;
        }

        private String ParceRequest (String request) {
            String[] subs = request.split("&");
            if (subs[0].contains("NewUser")) {
                String username = subs[1].split("=")[1];
                String telephone = subs[2].split("=")[2];
                String mail = subs[3].split("=")[3];
                String password = subs[4].split("=")[4];
                if (username != null && telephone != null && mail != null && password != null
                        && !username.equals("") && !telephone.equals("") && !mail.equals("") && !password.equals("")) {
                    _dataBase.NewUser(username, telephone, mail, password);
                    return "create user\n";
                } else {
                    return "Error\n";
                }
            } else {
                return "Error\n";
            }
        }
    }


    public static void ReadJSON () {
        String request = "";
        String json = "";


    }

}