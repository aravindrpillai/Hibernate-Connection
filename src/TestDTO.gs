package hibernate

uses javax.persistence.Entity
uses javax.persistence.Column
uses javax.persistence.Id


/**
 * @author     : Aravind R Pillai
 * date        : 09 Sept 2017
 * description : DTO Class for TestDTO
 */
@Entity("TestDTO")
class TestDTO {

  @Id
  @Column(:name="ID")
  private var id : int as ID

  @Column(:name="NAME")
  private var name : String as Name

  @Column(:name="MOBILE")
  private var mobile : String as Mobile

}