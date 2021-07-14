export class errortype
{
    public ID: number;
    public ErrorName: string;
}

export class Userdd
{
    public ID: string;
    public UserName: string;
}


export class ddlist
{
    errortypelst : errortype[];
    Userddlist   : Userdd[];
}
