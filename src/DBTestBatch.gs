package hibernate

uses gw.api.system.database.SequenceUtil
uses gw.processes.BatchProcessBase

class DBTestBatch extends BatchProcessBase{

  var dbInstance : DatabaseDAO

  construct() {
    super(BatchProcessType.TC_AA_HIBERNATE_TEST)
  }



  override function doWork() {

    print("_____DO WORK STARTS_____\n")

    dbInstance = new DatabaseDAO()

    //addRecord()
    //addListOfRecords()

    /*
    readRecords()
    print("\n___________________________\n")
    readRecordsWithIDCriteria()
    print("\n___________________________\n")
    readRecordsWithStringCriteria()
    print("\n___________________________\n")
    readRecordsWithQuery()
    */

    //deleteRecord()
    //updateSingleRecord()
    //updateListOfRecords()

    print("\n_____DO WORK ENDS_____\n")
  }




  /*
   * Description : Add single Record to DB Table
   */
  private function addRecord(){

    var dto = new TestDTO()
    dto.ID = getID()
    dto.Name = "Name_00"+dto.ID
    dto.Mobile= "9990001"+dto.ID

    dbInstance.addRecord(dto)

  }



  /*
   * Description : Add List of Records to DB Table
   */
  private function addListOfRecords(){

    var dto1 = new TestDTO()
    var dto2 = new TestDTO()
    var dto3 = new TestDTO()
    var dto4 = new TestDTO()
    var dto5 = new TestDTO()
    var dto6 = new TestDTO()

    dto1.ID = getID()
    dto2.ID = getID()
    dto3.ID = getID()
    dto4.ID = getID()
    dto5.ID = getID()
    dto6.ID = getID()

    dto1.Name = "Name_00"+dto1.ID
    dto2.Name = "Name_00"+dto2.ID
    dto3.Name = "Name_00"+dto3.ID
    dto4.Name = "Name_00"+dto4.ID
    dto5.Name = "Name_00"+dto5.ID
    dto6.Name = "Name_00"+dto6.ID

    dto1.Mobile= "9990000"+dto1.ID
    dto2.Mobile= "9990000"+dto2.ID
    dto3.Mobile= "9990000"+dto3.ID
    dto4.Mobile= "9990000"+dto4.ID
    dto5.Mobile= "9990000"+dto5.ID
    dto6.Mobile= "9990000"+dto6.ID

    var list : List<TestDTO> = new ArrayList<TestDTO>()
    list.add(dto1)
    list.add(dto2)
    list.add(dto3)
    list.add(dto4)
    list.add(dto5)
    list.add(dto6)

    dbInstance.addRecord(list)

  }



  /*
   * Description : Reads the entire records from DB without any criteria
   */
  private function readRecords(){
    var list = dbInstance.readRecords(TestDTO) as List<TestDTO>
    for(op in list){
      print(op.Mobile + " -- "+op.Name)
    }
  }




/*
 * Description : Read Records With ID Criteria
 */
  private function readRecordsWithIDCriteria(){
    var list = dbInstance.readRecordsWithIdCriteria(TestDTO, 5) as List<TestDTO>  // 10 is the id
    for(op in list){
      print(op.Mobile + " -- "+op.Name)
    }
  }


/*
 * Description : Read Records With List of String Criteria
 */
  private function readRecordsWithStringCriteria(){

    var hm = new HashMap<String, String>(){"name"->"Name_002","mobile"->"99900002"} //criteria as Hashmap
    var list = dbInstance.readRecordsWithStringCriteria(TestDTO, hm) as List<TestDTO>
    for(op in list){
      print(op.Mobile + " -- "+op.Name)
    }

  }


  /*
   * Description : Read Records With List of String Criteria
   */
  private function readRecordsWithQuery(){

    var query = "SELECT * FROM TestDTO WHERE id = 5"
    var list = dbInstance.readRecordsWithQuery(TestDTO, query)  as List<TestDTO>
    foreach(op in list){
      print(op.Mobile + " -- "+op.Name)
    }
  }



  /*
   * Description : Delete Record from DB Table | single record
   */
  private function deleteRecord(){

    var dto = new TestDTO()
    dto.ID = 7

    dbInstance.deleteRecord(dto)
  }



  /*
   * Description : Update single Record from DB Table
   */
  private function updateSingleRecord(){

    var dto = new TestDTO()
    dto.ID = 3         // This should not be changed
    dto.Name = "Ashik Abu"
    dto.Mobile= "8877000011"

    dbInstance.updateRecord(dto)

  }



  /*
   * Description : Update List of Records to DB Table
   */
  private function updateListOfRecords(){

    var dto1 = new TestDTO()
    var dto2 = new TestDTO()
    var dto3 = new TestDTO()
    var dto4 = new TestDTO()
    var dto5 = new TestDTO()
    var dto6 = new TestDTO()

    dto1.ID = 1
    dto2.ID = 2
    dto3.ID = 3
    dto4.ID = 4
    dto5.ID = 5
    dto6.ID = 6

    dto1.Name = "Name_u_"+dto1.ID
    dto2.Name = "Name_u_"+dto2.ID
    dto3.Name = "Name_u_"+dto3.ID
    dto4.Name = "Name_u_"+dto4.ID
    dto5.Name = "Name_u_"+dto5.ID
    dto6.Name = "Name_u_"+dto6.ID

    dto1.Mobile= "9990010"+dto1.ID
    dto2.Mobile= "9990010"+dto2.ID
    dto3.Mobile= "9990010"+dto3.ID
    dto4.Mobile= "9990010"+dto4.ID
    dto5.Mobile= "9990010"+dto5.ID
    dto6.Mobile= "9990010"+dto6.ID

    var list : List<TestDTO> = new ArrayList<TestDTO>()
    list.add(dto1)
    list.add(dto2)
    list.add(dto3)
    list.add(dto4)
    list.add(dto5)
    list.add(dto6)

    dbInstance.updateRecord(list)

  }



  /*
   * Description : Returns Unique ID
   */
  function getID() : int{
    return SequenceUtil.next(1,"val_") as int
  }

}