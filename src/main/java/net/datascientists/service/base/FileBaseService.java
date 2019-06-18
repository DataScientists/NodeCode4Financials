package net.datascientists.service.base;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
public interface FileBaseService<T> extends BaseService<T> {

    public T uploadFile(InputStream is, T entityVO) throws IOException;
	
	public InputStream downloadFile(T entityVO) throws IOException;
	
	
}
