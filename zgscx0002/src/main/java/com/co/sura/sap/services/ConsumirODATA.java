package com.co.sura.sap.services;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.core.MediaType;


@Path("/procesos")
public class ConsumirODATA {

	@GET
	@Path("/listado")
    @Produces(MediaType.TEXT_PLAIN)
	public String getProcesos(@QueryParam("request") String request ,
			 @DefaultValue("1") @QueryParam("version") int version) {

		String response = null;

        try{			
            switch(version){
	            case 1:


	                response = "Response from Jersey Restful Webservice : " + request;
                    break;
                default: throw new Exception("Unsupported version: " + version);
            }
        }
        catch(Exception e){
        	response = e.getMessage().toString();
        }
        

        return response;	
	}

}
