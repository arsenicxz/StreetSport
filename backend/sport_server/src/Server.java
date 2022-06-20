import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.sql.SQLException;

public class Server {
    //сервер
    private HttpServer _server = null;

    //создание сервера
    public Server () throws IOException {
        _server = HttpServer.create(new InetSocketAddress("localhost", 8001), 0);
        System.out.println("server started at port 8001 (localhost)");

        _server.createContext("/", new MyHttpHandler() {
            @Override
            public int HandleHtml(String request, StringBuilder answer, String request_url) {
                return 0;
            }
        });
        _server.createContext("/login", new LoginHandler());
        _server.createContext("/reg", new NewUserHandler());
        _server.createContext("/delete", new DeleteUserHandler());
        _server.createContext("/edit", new EditUserHandler());

        _server.setExecutor(null);
    }

    //запуск сервера
    public void start() {
        _server.start();
    }

    //хендлер для принятия запросов на сервер
    abstract static class MyHttpHandler implements HttpHandler {

        //public abstract int HandleHtml(String request, StringBuilder answer, String request_url);
        public abstract int HandleHtml(String request, StringBuilder answer, String request_url);

        public void handle (HttpExchange t) throws IOException {
            String reguest_url = t.getRequestURI().toString();
            System.out.println("Reguest URL : " + reguest_url);
            String requestMethod = t.getRequestMethod();
            InputStream is;
            String requestObj = "";
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
                        requestObj = URLDecoder.decode(requestBuffer.toString(), "UTF-8");
                    } else {
                        requestObj = null;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            String response = "Error";
            StringBuilder answer = new StringBuilder();
            HandleHtml(requestObj, answer, reguest_url);
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
        private DataBase _dataBase;
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
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("CheckUserAuth")) {
                    String login = (String) req.get("login");
                    String password = (String) req.get("password");
                    System.out.println("user: " + login + " " + password);

                    if (_dataBase.CheckUserAuth(login, password)) {
                        answer.put("answer", "user login in");
                        result = answer.toJSONString();
                        //return result;
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                        //return result;
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }

        /*private String ParceRequest (String request) {
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
        }*/
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
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();
            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("NewUserReg")) {
                    String username = (String) req.get("username");
                    String telephone = (String) req.get("telephone");
                    String mail = (String) req.get("mail");
                    String password = (String) req.get("password");
                    System.out.println("user: " + username + " " + telephone + " " + mail + " " + password);

                    if (_dataBase.NewUser(username, telephone, mail, password)) {
                        answer.put("answer", "you sign in");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //удаление пользователя
    public static class DeleteUserHandler extends MyHttpHandler {
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
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();

            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("DeleteUser")) {
                    int id = (int) req.get("id");
                    System.out.println("user with id: " + id);

                    if (_dataBase.DeleteUser(id)) {
                        answer.put("answer", "this user deleted");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

    //редактирование профиля
    public static class EditUserHandler extends MyHttpHandler {
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
            System.out.println(request);
            String obrabotka = ParceRequest(request);
            System.out.println(obrabotka);
            answer.append(obrabotka);
            return 200;
        }

        private String ParceRequest (String request) {
            JSONObject answer = new JSONObject();
            answer.put("answer", "server error!");
            String result = answer.toJSONString();

            try {
                Object obj = new JSONParser().parse(request);
                JSONObject req = (JSONObject) obj;
                String mod = (String) req.get("mod");

                if (mod.contains("EditUser")) {
                    int id = (int) req.get("id");
                    String username = (String) req.get("username");
                    String telephone = (String) req.get("telephone");
                    String mail = (String) req.get("mail");
                    String password = (String) req.get("password");
                    System.out.println("user with id: " + id + " " + username
                            + " " + telephone + " " + mail + " " + password);

                    if (_dataBase.EditUser(id, username, telephone, mail, password)) {
                        answer.put("answer", "your profile was edited");
                        result = answer.toJSONString();
                    } else {
                        answer.put("answer", "error 1!!!");
                        result = answer.toJSONString();
                    }
                }
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return result;
        }
    }

}