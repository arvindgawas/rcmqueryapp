export class user
{
    public UserId: string;
    public UserName: string;
    public UserPass: string;
    public UserRole: string;
    public Createdby:string;
    public Createddate:Date;
    public Modifiedby:string;
    public Modifieddate: Date;
    public lstuserbankmap : userbankmap[];
}

export class userbankmap
{
    public UserId: string;
    public Bank : string;
    public QueryType : string;
    public UserPriority: string;
}

