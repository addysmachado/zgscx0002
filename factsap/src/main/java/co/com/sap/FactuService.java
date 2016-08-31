package co.com.sap;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletResponse;
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
import javax.ws.rs.core.Response;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;


import com.sap.core.connectivity.api.http.HttpDestination;

@Path("/bandeja")
public class FactuService {

	private static final int COPY_CONTENT_BUFFER_SIZE = 1024;

	@GET
	@Path("/")
    @Produces(MediaType.APPLICATION_JSON)
	public Response getFacturas() {

	    HttpClient httpClient = null;
	    HttpGet httpGet = null;
	    
	    String msgBody = null;
	    
        try 
        {
            // Get HTTP destination
            Context ctx = new InitialContext();
            
            HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/" +  "DevSAP");

            // Create HTTP client
            httpClient = destination.createHttpClient();
            
            final String baseURL = destination.getURI().toString();
            
            //String destinationURL = baseURL + "/sap/opu/odata/SAP/ZGSMM0001_SRV/BandejaSet?$format=json&sap-client=120";
            String destinationURL = baseURL + "/sap/opu/odata/SAP/ZGSMM0001_SRV/BandejaSet?$format=json";
            
            System.out.println(" 0. Ingresa  ");
            System.out.println(" 0. destinationURL  "+destinationURL);
            // Execute HTTP request
            httpGet = new HttpGet(destinationURL);
            
            HttpResponse httpResponse = httpClient.execute(httpGet);

            // Check response status code
            int statusCode = httpResponse.getStatusLine().getStatusCode();
            
            System.out.println(" 0. statusCode  "+statusCode);
            
            // copy content from the incoming response to the outgoing response
            HttpEntity entity = null;
            
            if (httpResponse != null)
            {
            	entity = httpResponse.getEntity();
            }
            
            msgBody = getResponseBodyasString(entity);
            
            if (statusCode == HttpServletResponse.SC_OK) 
            {
                return Response.ok(msgBody).build();
            }
            else
            {
            	return Response.status(statusCode).entity(msgBody).build();
            }

        } 
        catch (RuntimeException e) 
        {
            // In case of an unexpected exception we abort the HTTP request 
        	// in order to shut down the underlying connection immediately.
            if (httpGet != null)
            {
            	httpGet.abort();
            }
        	
            // unexpected runtime error
            String errorMessage = "'Houston, we have a problem!' : "
                    + e.getMessage()
                    + ". See logs for details.";
            
            msgBody = errorMessage;
            
            System.out.println(" 1. " + errorMessage);
            System.out.println(" 1.0. " );
            e.printStackTrace();
        } 
        catch (NamingException e) 
        {
            // Lookup of destination failed
            String errorMessage = "Lookup of destination failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have the destination "
                    + "[openweathermap-destination]" + " configured.";
            
            msgBody = errorMessage;
            
            System.out.println(" 2. " + errorMessage);
        } 
        catch (Exception e) 
        {
            // Connectivity operation failed
            String errorMessage = "Connectivity operation failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have an HTTP proxy configured in your "
                    + "local Eclipse environment in case your environment uses "
                    + "an HTTP proxy for the outbound Internet "
                    + "communication.";
            
            msgBody = errorMessage;
            
            System.out.println(" 3. " + errorMessage);
        } 
        finally 
        {
            // When HttpClient instance is no longer needed, shut down the connection manager to ensure immediate
            // deallocation of all system resources
            if (httpClient != null) 
            {
                httpClient.getConnectionManager().shutdown();
            }
        }
        
        // if we end up here something went really bad
        return Response.serverError().build();
		
	}
	

	
	@GET
	@Path("/pedido")
    @Produces(MediaType.APPLICATION_JSON)
	public Response getPedido(@QueryParam("documento") String documento, 
					          @QueryParam("sociedad") String sociedad,
					          @QueryParam("cliente") String cliente) {

	    HttpClient httpClient = null;
	    HttpGet httpGet = null;
	    
	    String msgBody = null;
	    
        try 
        {
            // Get HTTP destination
            Context ctx = new InitialContext();
            
            HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/" +  "DevSAP");

            // Create HTTP client
            httpClient = destination.createHttpClient();
            
            final String baseURL = destination.getURI().toString();
            
            //CabeceraPedidoSet(Ebeln='4500002698',Lifnr='800006649',Bukrs='2200')?$format=json
            String destinationURL = baseURL + "/sap/opu/odata/SAP/ZGSMM0001_SRV/CabeceraPedidoSet(Ebeln='"+documento+
            								  "',Lifnr='"+cliente+"',Bukrs='"+sociedad+"')?$format=json";
            
            
            System.out.println(" 1. Ingresa pedido ");
            System.out.println(" 1. destinationURL pedido  "+destinationURL);
            // Execute HTTP request
            httpGet = new HttpGet(destinationURL);
            
            HttpResponse httpResponse = httpClient.execute(httpGet);

            // Check response status code
            int statusCode = httpResponse.getStatusLine().getStatusCode();
            
            System.out.println(" 1. statusCode pedido  "+statusCode);
            
            // copy content from the incoming response to the outgoing response
            HttpEntity entity = null;
            
            if (httpResponse != null)
            {
            	entity = httpResponse.getEntity();
            }
            
            msgBody = getResponseBodyasString(entity);
            
            if (statusCode == HttpServletResponse.SC_OK) 
            {
                return Response.ok(msgBody).build();
            }
            else
            {
            	return Response.status(statusCode).entity(msgBody).build();
            }

        } 
        catch (RuntimeException e) 
        {
            // In case of an unexpected exception we abort the HTTP request 
        	// in order to shut down the underlying connection immediately.
            if (httpGet != null)
            {
            	httpGet.abort();
            }
        	
            // unexpected runtime error
            String errorMessage = "'Houston, we have a problem!' : "
                    + e.getMessage()
                    + ". See logs for details.";
            
            msgBody = errorMessage;
            
            System.out.println(" 1. " + errorMessage);
            System.out.println(" 1.0. " );
            e.printStackTrace();
        } 
        catch (NamingException e) 
        {
            // Lookup of destination failed
            String errorMessage = "Lookup of destination failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have the destination "
                    + "[openweathermap-destination]" + " configured.";
            
            msgBody = errorMessage;
            
            System.out.println(" 2. " + errorMessage);
        } 
        catch (Exception e) 
        {
            // Connectivity operation failed
            String errorMessage = "Connectivity operation failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have an HTTP proxy configured in your "
                    + "local Eclipse environment in case your environment uses "
                    + "an HTTP proxy for the outbound Internet "
                    + "communication.";
            
            msgBody = errorMessage;
            
            System.out.println(" 3. " + errorMessage);
        } 
        finally 
        {
            // When HttpClient instance is no longer needed, shut down the connection manager to ensure immediate
            // deallocation of all system resources
            if (httpClient != null) 
            {
                httpClient.getConnectionManager().shutdown();
            }
        }
        
        // if we end up here something went really bad
        return Response.serverError().build();
		
	}

	
	
	@GET
	@Path("/pedidodet")
    @Produces(MediaType.APPLICATION_JSON)
	public Response getPedidoDet(@QueryParam("documento") String documento, 
					             @QueryParam("sociedad") String sociedad,
					             @QueryParam("cliente") String cliente) {

	    HttpClient httpClient = null;
	    HttpGet httpGet = null;
	    
	    String msgBody = null;
	    
        try
        {
            // Get HTTP destination
            Context ctx = new InitialContext();
            
            HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/" +  "DevSAP");

            // Create HTTP client
            httpClient = destination.createHttpClient();
            
            final String baseURL = destination.getURI().toString();
            
            //CabeceraPedidoSet(Ebeln='4500002698',Lifnr='800006649',Bukrs='2200')?$format=json
            String destinationURL = baseURL + "/sap/opu/odata/SAP/ZGSMM0001_SRV/CabeceraPedidoSet(Ebeln='"+documento+
            								  "',Lifnr='"+cliente+"',Bukrs='"+sociedad+"')/NumeroPedido?$format=json";
            
            
            System.out.println(" 2. Ingresa pedido ");
            System.out.println(" 2. destinationURL pedidodet  "+destinationURL);
            // Execute HTTP request
            httpGet = new HttpGet(destinationURL);
            
            HttpResponse httpResponse = httpClient.execute(httpGet);

            // Check response status code
            int statusCode = httpResponse.getStatusLine().getStatusCode();
            
            System.out.println(" 2. statusCode pedidodet  "+statusCode);
            
            // copy content from the incoming response to the outgoing response
            HttpEntity entity = null;
            
            if (httpResponse != null)
            {
            	entity = httpResponse.getEntity();
            }
            
            msgBody = getResponseBodyasString(entity);
            
            if (statusCode == HttpServletResponse.SC_OK) 
            {
                return Response.ok(msgBody).build();
            }
            else
            {
            	return Response.status(statusCode).entity(msgBody).build();
            }

        } 
        catch (RuntimeException e) 
        {
            // In case of an unexpected exception we abort the HTTP request 
        	// in order to shut down the underlying connection immediately.
            if (httpGet != null)
            {
            	httpGet.abort();
            }
        	
            // unexpected runtime error
            String errorMessage = "'Houston, we have a problem!' : "
                    + e.getMessage()
                    + ". See logs for details.";
            
            msgBody = errorMessage;
            
            System.out.println(" 1. " + errorMessage);
            System.out.println(" 1.0. " );
            e.printStackTrace();
        } 
        catch (NamingException e) 
        {
            // Lookup of destination failed
            String errorMessage = "Lookup of destination failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have the destination "
                    + "[openweathermap-destination]" + " configured.";
            
            msgBody = errorMessage;
            
            System.out.println(" 2. " + errorMessage);
        } 
        catch (Exception e) 
        {
            // Connectivity operation failed
            String errorMessage = "Connectivity operation failed with reason: "
                    + e.getMessage()
                    + ". See "
                    + "logs for details. Hint: Make sure to have an HTTP proxy configured in your "
                    + "local Eclipse environment in case your environment uses "
                    + "an HTTP proxy for the outbound Internet "
                    + "communication.";
            
            msgBody = errorMessage;
            
            System.out.println(" 3. " + errorMessage);
        } 
        finally 
        {
            // When HttpClient instance is no longer needed, shut down the connection manager to ensure immediate
            // deallocation of all system resources
            if (httpClient != null) 
            {
                httpClient.getConnectionManager().shutdown();
            }
        }
        
        // if we end up here something went really bad
        return Response.serverError().build();
		
	}
	
	static String getResponseBodyasString(HttpEntity entity) throws Exception
	{
		String retVal = null;
		
		if (entity != null) 
        {
            InputStream instream = entity.getContent();
            ByteArrayOutputStream outstream = new ByteArrayOutputStream();
            
            try 
            {
                byte[] buffer = new byte[COPY_CONTENT_BUFFER_SIZE];
                int len;
                while ((len = instream.read(buffer)) != -1) 
                {
                	outstream.write(buffer, 0, len);
                }
            } 
            catch (IOException e) 
            {
                // In case of an IOException the connection will be released
                // back to the connection manager automatically
                throw e;
            } 
            finally 
            {
                // Closing the input stream will trigger connection release
                try 
                {
                    instream.close();
                } 
                catch (Exception e) 
                {
                // Ignore
                }
            }
            
            retVal = outstream.toString("UTF-8");
        }
		
		return retVal;
	}	
	

}
