package net.datascientists.filter;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.UrlPathHelper;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import net.datascientists.constants.WSConstants;
import net.datascientists.service.base.BaseService;
import net.datascientists.service.security.TokenManager;
import net.datascientists.utilities.PropUtil;
import net.datascientists.vo.HeaderVO;
import net.datascientists.vo.JMXLogVO;

public class JMXFilter extends GenericFilterBean
{

    @Autowired
    @Qualifier("JMXService")
    private BaseService<JMXLogVO> service;
    @Autowired
    private TokenManager tokenManager;
    private UrlPathHelper urlPathHelper = new UrlPathHelper(); 

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        HttpServletRequest httpRequest = asHttp(request);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
        String username = httpRequest.getHeader(WSConstants.AUTH_USERNAME_PROP);
        String token = httpRequest.getHeader(WSConstants.AUTH_TOKEN);

        JMXLogVO vo = new JMXLogVO();
        String resourcePath = urlPathHelper
            .getPathWithinApplication(httpRequest);
        if(skipJmeterForSpecificURLs(resourcePath) || skipJmeterLogging()){
            chain.doFilter(request, response);
            return;
        }
        vo.setFunction(resourcePath);
        vo.setDeleted(0);
        setGetOrPostParameters(vo, httpRequest);
        String headers = buildHeaders(httpRequest);
        vo.setHeader(headers);
        if (!StringUtils.isEmpty(token))
        {
            vo.setSessionId(token.substring(0, token.indexOf("."))+tokenManager.parseUsernameFromToken(token)+tokenManager.parseExpiryFromToken(token));
            vo.setUserId(tokenManager.parseUsernameFromToken(token));
        }else{
            vo.setSessionId(token);
            vo.setUserId(username);
        }
        service.save(vo);
        chain.doFilter(request, response);
    }


    private void setGetOrPostParameters(JMXLogVO vo, HttpServletRequest httpRequest)
    {
        Gson gson = new Gson();
        if ("GET".equals(httpRequest.getMethod()))
        {
            String requestParam = "";
            if(!httpRequest.getParameterMap().isEmpty()){
                requestParam = gson.toJson(httpRequest.getParameterMap());
            }
            vo.setGetParameters(requestParam);
        }
        else
        {
            String requestParam = "";
            if(!httpRequest.getParameterMap().isEmpty()){
                requestParam = gson.toJson(httpRequest.getParameterMap());
            }
            vo.setPostParameters(requestParam);
        }
    }

    private String buildHeaders(HttpServletRequest httpRequest)
    {
        Gson gson = new Gson();
        List<HeaderVO> list = new ArrayList<>();
        @SuppressWarnings("unchecked")
        Enumeration<String> headerNames = httpRequest.getHeaderNames();

        if (headerNames != null) {
                while (headerNames.hasMoreElements()) {
                    String name = headerNames.nextElement();
                    if(name.contains("x-auth-token") || name.contains("cookie")){
                        continue;
                    }
                    list.add(new HeaderVO(name, httpRequest.getHeader(name)));
                }
        }
        Type listType = new TypeToken<List<HeaderVO>>() {}.getType();
        return gson.toJson(list,listType);
    }
    
    private boolean skipJmeterLogging()
    {
        String property = PropUtil.getInstance().getProperty("jmx.skiplogging");
        if(property == null || property.isEmpty() || "false".equals(property)){
            return false;
        }
        return true;
    }

    private boolean skipJmeterForSpecificURLs(String resourcePath){
        String property = PropUtil.getInstance().getProperty("jmx.ignoreUrl");
        if(property == null || property.isEmpty()){
            return false;
        }
        List<String> listOfURLToIgnore = splitCommaDelimitedProperty(property);
        if(listOfURLToIgnore.contains(resourcePath)){
            return true;
        }
        return false;
    }
    
    private List<String> splitCommaDelimitedProperty(String property)
    {
        String commaDelimiter = ",";
        if(property.contains(commaDelimiter)){
            String[] split = property.split(commaDelimiter);
            return Arrays.asList(split);
        }else{
            List<String> result = new ArrayList<>();
            result.add(property);
            return result;
        }
    }

    private HttpServletRequest asHttp(ServletRequest request) {
        return (HttpServletRequest) request;
    }

    private HttpServletResponse asHttp(ServletResponse response) {
        return (HttpServletResponse) response;
    }
}
