package hibernate

uses org.hibernate.criterion.Restrictions
uses org.slf4j.LoggerFactory


/**
 * @author     : Aravind R Pillai
 * date        : 09 Sept 2017
 * description : Class which holds all DB functionality
 */
class DatabaseDAO {

  private var integDButil : DatabaseUtil
  private var logger = LoggerFactory.getLogger("DataBaseUtil")

  construct() {
    integDButil = DatabaseUtil.getInstance()
  }





  /**
   * description : Function return records as list | No criteria
   * @param      : DTO Object
   * @return     : List of object
   */
  function readRecords(dtoName: Object): List<Object> {

    var list : List

    try{
      var cr = integDButil.openSession().createCriteria(dtoName as String)
      list = cr.list()

    }catch(exp: Exception) {
      logger.error("Failed To Read Records From Table "+dtoName )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

    return list
  }





  /**
   * description : Function read records with ID critera
   * @param      : DTO Object and Id
   * @return     : List<Object>
   */
  function readRecordsWithIdCriteria(dtoName: Object, id : int ) : List<Object> {

    var list : List
    try{

      var cr = integDButil.openSession().createCriteria(dtoName as String)
      cr.add(Restrictions.eq("id", id))
      list = cr.list()

    }catch(exp: Exception) {
      logger.error("Failed To Read Records From Table "+dtoName )
      throw exp

    } finally {
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

    return list
  }





  /**
   * description : Function read records with variables of datatype STRING as criteria
   * @param      : DTO Object and hashmap object with contains all criterias
   * @return     : List<Object>
   */
  function readRecordsWithStringCriteria(dtoName: Object, hm : HashMap<String, String> ) : List<Object> {

    var list : List
    try{

      var cr = integDButil.openSession().createCriteria(dtoName as String)

      for(key in hm.getKeys()){
        cr.add(Restrictions.eq(key, hm.get(key)))
      }

      list = cr.list()

    }catch(exp: Exception) {
      logger.error("Failed To Read Records From Table "+dtoName )
      throw exp

    } finally {
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

    return list
  }







  /**
   * description : Function read records with input query
   * @param      : DTO Object and query
   * @return     : List<Object>
   */
  function readRecordsWithQuery(dtoClass : Class , sqlQuery : String ) : List<Object> {

    var list : List
    try{

      var session = integDButil.openSession()

      var query = session.createSQLQuery(sqlQuery);
      query.addEntity(dtoClass);
      list = query.list();

    }catch(exp: Exception) {
      logger.error("Failed To Read Records From Table " )
      throw exp

    } finally {
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

    return list
  }







  /**
   * description : Function delete records (id constraint)
   * @param      : Id Specified DTO Object
   * @return     : null
   */
  function deleteRecord(obj: Object): void {

    try{
      var session = integDButil.openSession()
      session.getTransaction().begin()
      session.delete(obj)
      session.getTransaction().commit()
      session.close()

    }catch(exp: Exception) {
      logger.error("Failed To Delete Record From Table "+obj.toString() )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

  }





  /**
   * description : Function add single record
   * @param      : DTO Object with value
   * @return     : null
   */
  function addRecord(obj: Object): void {

    try {
      var session = integDButil.openSession()
      session.getTransaction().begin()
      session.persist(obj)
      session.getTransaction().commit()
      session.close()

    }catch(exp: Exception) {
      logger.error("Failed To Add Record To Table "+obj.Class.Name.toString() )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }
  }




  /**
   * description : Function add list of records
   * @param      : DTO Object List
   * @return     : null
   */
  function addRecord(objList: List<Object>): void {

    try {
      var session = integDButil.openSession()
      session.getTransaction().begin()

      foreach(obj in objList){
        session.persist(obj)
      }

      session.getTransaction().commit()
      session.close()

    }catch(exp: Exception) {
      logger.error("Failed To Add Record To Table" )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

  }




  /**
   * description : Function update single record
   * @param      : DTO Object and hashmap object with contains all criterias
   * @return     : null
   */
  function updateRecord(obj : Object): void {

    try {
      var session = integDButil.openSession()
      session.getTransaction().begin()
      session.update(obj)
      session.getTransaction().commit()
      session.close()

    }catch(exp: Exception) {
      logger.error("Failed To Update Record From Table" )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

  }




  /**
   * description : Function update list of records
   * @param      : DTO Object List
   * @return     : null
   */
  function updateRecord(objList: List<Object>): void {

    try {
      var session = integDButil.openSession()
      session.getTransaction().begin()

      foreach(obj in objList){
        session.update(obj)
      }

      session.getTransaction().commit()
      session.close()

    }catch(exp: Exception) {
      logger.error("Failed To Update Record From Table" )
      throw exp

    }finally{
      if (integDButil != null) {
        integDButil.closeCurrentSession()
      }
    }

  }




}