import jdk.javadoc.doclet.Taglet;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
    //НЕ РАБОТАЕТ КОДИРОВКА ДЛЯ АДРЕСА И ПРОФИЛЯ
    public boolean Couching (int gametypeid, int tournamentid, LocalDate date,
                            Time time, int rating, String creatorcouching, String address,
                            double latitude, double longitude, int count) {

        try {
            String query = "INSERT INTO couching " +
                    "(gametypeid, tournamentid, date, time, " +
                    "creatorcouching, address, latitude, longitude, count) " +
                    "VALUES ('" + gametypeid + "','" + tournamentid + "','" + date + "','" + time + "',  '"+rating+"' " +
                    "'" + creatorcouching + "',N'"+address+"', '" + latitude + "','" + longitude + "', '"+count+"')";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //завершение игры
    public boolean GameEnding (int couchingid, int played) {
        try {
            String query = "UPDATE couching SET played = '" + played + "' WHERE couchingid = '" + couchingid + "' ";
            PreparedStatement prSt = dbConnection.prepareStatement(query);
            boolean res = prSt.execute(query);
            System.out.println(res);
            return  true;
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
                String duration = result.getString(8);
                System.out.println(duration);
                String latitude = result.getString(11);
                System.out.println(latitude);
                String longitude = result.getString(12);
                System.out.println(longitude);

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("couchingid", couchingid);
                resultJSON.put("gametypeid", gametype);
                resultJSON.put("tournametid", tournametid);
                resultJSON.put("time", time);
                resultJSON.put("duration", duration);
                resultJSON.put("latitude", latitude);
                resultJSON.put("longitude", longitude);
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
        String query = "SELECT username, telephone, mail FROM user " +
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

                JSONObject resultJSON = new JSONObject();
                resultJSON.put("username", username);
                resultJSON.put("telephone", telephone);
                resultJSON.put("mail", mail);
                return resultJSON.toJSONString();
            }
            return "-1";
        }
        catch (SQLException e) {
            e.printStackTrace();
            return "-1";
        }
    }

    //подсчет записавшихся на игру
    public boolean CountUsersOnGame (int couchingid) {
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
    }
}