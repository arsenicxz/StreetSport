import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.w3c.dom.Text;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Properties;

public class DataBase {
    Connection dbConnection;

    public DataBase() throws SQLException, IOException {
        String[] connParams = {"", "", ""};
        getConnectionParameters(connParams);
        dbConnection = DriverManager.getConnection(connParams[0], connParams[1], connParams[2]);
    }

    public void getConnectionParameters(String[] connParams) throws IOException {
        Properties props = new Properties();
        try(InputStream in = Files.newInputStream(Paths.get("database.properties"))) {
            props.load(in);
        }
        connParams[0] = props.getProperty("url");
        connParams[1] = props.getProperty("username");
        connParams[2] = props.getProperty("password");
    }

    //проверка авторизованности пользователя
    public String CheckUserAuth (String login, String password) {
        if (login.contains("@")) {
            String query = "SELECT userid, mail, password FROM user " +
                    "WHERE mail = '" + login + "' AND password = '" + password + "'";
            try {
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                ResultSet result =  prSt.executeQuery();
                if(result.next()) {
                    String id = result.getString(1);
                    System.out.println(id);
                    return id;
                }
                return "-1";
            }
            catch (SQLException e) {
                e.printStackTrace();
                return "-1";
            }
        } else {
            String query = "SELECT userid, telephone, password FROM user " +
                    "WHERE telephone = '" + login + "' AND password = '" + password + "'";
            try {
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                ResultSet result =  prSt.executeQuery();
                if(result.next()) {
                    String id = result.getString(1);
                    System.out.println(id);
                    return id;
                }
                return "-1";
            }
            catch (SQLException e) {
                e.printStackTrace();
                return "-1";
            }
        }
    }

    //добавление/создание профиля пользователя
    public boolean NewUser(String username,
                           String telephone,
                           String mail,
                           String password) {
        if(Objects.equals(telephone, "") && Objects.equals(mail, "")){
            return false;
        }
        try {
            String query = "INSERT INTO user (username, telephone, mail, password) " +
                    "VALUES ('" + username + "','"+ telephone +"','"+ mail +"','"+ password +"')";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            if(res){
                return true;
            }else{
                return true;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //редактирование профиля пользователя
    public boolean EditUser (int userid,
                            String username,
                            String telephone,
                            String mail,
                            String password) {
        try {
            String query = "UPDATE user SET username = '"+username+"', telephone = '"+telephone+"', " +
                    "mail = '"+mail+"', password = '"+password+"' WHERE id = '"+userid+"'";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //удалить профиль пользователя
    public boolean DeleteUser (int userid) {
        String query = "DELETE FROM user WHERE id = '"+userid+"'";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        }
        catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //выбор интересующих игр
    //страничка - мои игры
    public boolean EditUserGames (int userid, int gametypeid) {
        try {
            String query = "INSERT INTO usergamelike " +
                    "(userid, gametypeid) VALUES ('" + userid + "','" + gametypeid + "') ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        }
         catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //показать виды спорта пользователя
    public boolean ShowUserGames (int userid) {
        try {
            String query = "SELECT gametypeid FROM usergamelike " +
                    "WHERE userid = '" + userid + "' ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //создание игры
    public boolean Couching (int gametypeid, int tournamentid, LocalDate date,
                             Time time, int rating, String creatorcouching, String address,
                             double latitude, double longitude, int count, double userrating) {

        try {
            String query = "INSERT INTO couching " +
                    "(gametypeid, tournamentid, date, time, rating, " +
                    "creatorcouching, address, latitude, longitude, count, userrating) " +
                    "VALUES ('" + gametypeid + "','" + tournamentid + "','" + date + "','" + time + "',  '"+rating+"', " +
                    "'" + creatorcouching + "', '"+address+"', '" + latitude + "','" + longitude + "', '"+count+"', '"+userrating+"')";
            System.out.println(query);
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //поиск игр
    public String SearchGames (String gametypeid, LocalDate date) {
        String query = "SELECT * FROM couching " +
                "WHERE gametypeid IN (" + gametypeid + ") AND date = '" + date + "'";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();
            System.out.println(query);
            while(result.next()) {
                String couchingid = result.getString(1);
                System.out.println(couchingid);
                String gametype = result.getString(2);
                System.out.println(gametype);
                String tournametid = result.getString(3);
                System.out.println(tournametid);
                String time = result.getString(5);
                System.out.println(time);
                String rating = result.getString(7);
                System.out.println(rating);
                String creatorcouching = result.getString(9);
                System.out.println(creatorcouching);
                String address = result.getString(10);
                System.out.println(address);
                String latitude = result.getString(11);
                System.out.println(latitude);
                String longitude = result.getString(12);
                System.out.println(longitude);
                String count = result.getString(13);
                System.out.println(count);
                String userrating = result.getString(14);
                System.out.println(userrating);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("couchingid", couchingid);
                resultJSON.put("gametypeid", gametype);
                resultJSON.put("tournametid", tournametid);
                resultJSON.put("time", time);
                resultJSON.put("rating", rating);
                resultJSON.put("creatorcouching", creatorcouching);
                resultJSON.put("address", address);
                resultJSON.put("latitude", latitude);
                resultJSON.put("longitude", longitude);
                resultJSON.put("count", count);
                resultJSON.put("userrating", userrating);

                list.add(resultJSON);
            }
            return list.toJSONString();
        } catch(SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //показать весь список видов спорта
    public String ShowAllTypes () {
        try {
            String query = "SELECT * FROM gametype";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();

            while (result.next()) {
                String gametypeid = result.getString(1);
                System.out.println(gametypeid);
                String gametypename = result.getString(2);
                System.out.println(gametypename);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("gametypeid", gametypeid);
                resultJSON.put("gametypename", gametypename);
                list.add(resultJSON);
            }
            return list.toJSONString();
        } catch(SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //показать профиль пользователя
    public String ShowUserProfile (String id) {
        int idInt = Integer.parseInt(id);
        String query = "SELECT username, telephone, mail, userrating FROM user " +
                "WHERE userid = '" + idInt+ "'";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            if(result.next()) {
                String username = result.getString(1);
                System.out.println(username);
                String telephone = result.getString(2);
                System.out.println(telephone);
                String mail = result.getString(3);
                System.out.println(mail);
                String userrating = result.getString(4);
                System.out.println(userrating);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("username", username);
                resultJSON.put("telephone", telephone);
                resultJSON.put("mail", mail);
                resultJSON.put("userrating", userrating);
                return resultJSON.toJSONString();
            }
            return "-1";
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //показать, созданные пользователем игры
    public String ShowCreateGames (String creatorcouching) {
        String query = "SELECT gametypeid, tournamentid, date, time, played, rating, address, " +
                "latitude, longitude, count FROM couching WHERE creatorcouching = '"+creatorcouching+"' ";
        try {
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();
            while (result.next()) {

                String gametypeid = result.getString(1);
                System.out.println(gametypeid);
                String tournametid = result.getString(2);
                System.out.println(tournametid);
                String date = result.getString(3);
                System.out.println(date);
                String time = result.getString(4);
                System.out.println(time);
                String played = result.getString(5);
                System.out.println(played);
                String rating = result.getString(6);
                System.out.println(rating);
                String address = result.getString(7);
                System.out.println(address);
                String latitude = result.getString(8);
                System.out.println(latitude);
                String longitude = result.getString(9);
                System.out.println(longitude);
                String count = result.getString(10);
                System.out.println(count);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("gametypeid", gametypeid);
                resultJSON.put("tournametid", tournametid);
                resultJSON.put("date", date);
                resultJSON.put("time", time);
                resultJSON.put("played", played);
                resultJSON.put("rating", rating);
                resultJSON.put("address", address);
                resultJSON.put("latitude", latitude);
                resultJSON.put("longitude", longitude);
                resultJSON.put("count", count);

                list.add(resultJSON);
            }
            return list.toJSONString();
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //рейтинг пользователя по итогу игры
    /*public boolean UserRating (String creatorcouching) {
        try {
            String query1 = "SELECT COUNT(played) FROM couching WHERE creatorcouching = '"+creatorcouching+"' ";
            PreparedStatement prSt1 = dbConnection.prepareStatement(query1);
            ResultSet res1 =  prSt1.executeQuery();
            String allplayed = null;
            while (res1.next()) {
                allplayed = res1.getString(1);
                System.out.println(allplayed);
            }

            String query2 = "SELECT COUNT(played) FROM couching WHERE played=1 AND creatorcouching = '"+creatorcouching+"' ";
            PreparedStatement prSt2 = dbConnection.prepareStatement(query2);
            ResultSet res2 =  prSt2.executeQuery();
            String goodplayed = null;
            while (res2.next()) {
                goodplayed = res2.getString(1);
                System.out.println(goodplayed);
            }

            double koef = Double.parseDouble(allplayed)/5;
            double rating = Double.parseDouble(goodplayed)/koef;

            rating = Math.round(rating * 100.0) / 100.0;
            System.out.println(rating);

            String query3 = "UPDATE user SET userrating = '"+rating+"' WHERE username = '"+creatorcouching+"'";
            PreparedStatement prSt = dbConnection.prepareStatement(query3);
            boolean res = prSt.execute(query3);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }*/

    //подсчет записавшихся на игру
    /*public boolean CountUsersOnGame (int couchingid) {
        try {
            String query = "UPDATE couching SET count =(count+1) WHERE couchingid = '"+couchingid+"'";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }*/

    //завершение игры
    /*public boolean GameEnding (int couchingid, int played, String creator) {
        try {
            String query = "UPDATE couching SET played = '" + played + "' WHERE couchingid = '" + couchingid + "' ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);

            UserRating(creator);

            return  true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }*/

    //запись на игру (НОВАЯ)
    public boolean PlayGame (int couchingid, String username) {
        String check = Check(couchingid, username);
        if (check.equals("1")) {
            System.out.println("error: this user are in game yet!!!");
            return false;
        } else {
            try {
                String query = "INSERT INTO whoingame (couchingid, username) VALUES ('"+couchingid+"', '"+username+"') ";
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                boolean res = prSt.execute(query);
                System.out.println(res);

                Update(couchingid);

                return true;
            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        }
    }
    public boolean Update (int couchingid) {
        try {
            String query = "UPDATE couching SET count =(count+1) WHERE couchingid = '"+couchingid+"' ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public String Check (int couchingid, String username) {
            String query = "SELECT EXISTS(SELECT * FROM whoingame WHERE couchingid = '"+couchingid+"' AND username='"+username+"') ";
            try {
                PreparedStatement prSt = dbConnection.prepareStatement(query);
                ResultSet result =  prSt.executeQuery();
                JSONObject list = new JSONObject();
                String value=null;
                while (result.next()) {
                    value = result.getString(1);
                    System.out.println(value);
                    //JSONObject resultJSON = new JSONObject();
                    //resultJSON.put("value", value);
                }
                return value;
        } catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //показать, записавшихся на игру (НОВАЯ)
    public String ShowWhoInGame (int couchingid) {
        try {
            String query = "SELECT * FROM whoingame WHERE couchingid = '"+couchingid+"' ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();

            while (result.next()) {
                String username = result.getString(2);
                System.out.println(username);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("username", username);

                list.add(resultJSON);
            }
            return list.toJSONString();
        } catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //добавить фото профиля (НОВОЕ)
    public boolean SetPhoto (int userid, String photo) {
        try {
            String query = "INSERT INTO userphoto (userid, photo) VALUES ('"+userid+"', '"+photo+"')";
            //String query = "UPDATE userphoto SET userid AND photo WHERE userid='"+userid+"' AND photo='"+photo+"'";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //показать фото профиля
    public String GetPhoto (int userid) {
        try {
            String query = "SELECT * FROM userphoto WHERE userid='"+userid+"'";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            ResultSet result =  prSt.executeQuery();
            JSONArray list = new JSONArray();
            while (result.next()) {
                String uid = result.getString(1);
                System.out.println(uid);
                String photo = result.getString(3);
                System.out.println(photo);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("userid", uid);
                resultJSON.put("photo", photo);
                list.add(resultJSON);
            }
            return list.toJSONString();
        } catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //оставить отзыв
    public boolean GetComment (String comment) {
        try {
            String query = "INSERT INTO comments (comment) VALUES ('"+comment+"')";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}