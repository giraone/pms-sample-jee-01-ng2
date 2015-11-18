import {CostCenter} from "../cost-center/entity.model";

export class Employee {

  /*
   private Long oid;
   private int versionNumber;
   private String personnelNumber;
   private NestedCostCenterDTO costCenter;
   private String lastName;
   private String firstName;
   private String gender;
   private Calendar dateOfBirth;
   private String nationalityCode;
   private Calendar dateOfEntry;
   */

  public oid:number;
  public versionNumber:number;
  public personnelNumber:string;
  public costCenter:CostCenter;
  public lastName:string;
  public firstName:string;
  public gender:string
  public dateOfBirth:string;
  public nationalityCode:string
  public dateOfEntry:string

  constructor() {
  }
}