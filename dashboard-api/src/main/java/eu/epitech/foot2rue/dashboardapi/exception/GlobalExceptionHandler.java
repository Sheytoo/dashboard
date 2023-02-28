package eu.epitech.foot2rue.dashboardapi.exception;

import eu.epitech.foot2rue.dashboardapi.dto.ErrorDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDto> handleResourceNotFoundException(ResourceNotFoundException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.NOT_FOUND.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorDto> handleEmailAlreadyExistsException(EmailAlreadyExistsException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.CONFLICT.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserAlreadySubscribedException.class)
    public ResponseEntity<ErrorDto> handleUserAlreadySubscribedException(UserAlreadySubscribedException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.CONFLICT.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotSubscribedException.class)
    public ResponseEntity<ErrorDto> handleUserNotSubscribedException(UserNotSubscribedException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.CONFLICT.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(WidgetTypeAlreadyExistsException.class)
    public ResponseEntity<ErrorDto> handleWidgetTypeAlreadyExistsException(WidgetTypeAlreadyExistsException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.CONFLICT.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(SteamIdInvalidException.class)
    public ResponseEntity<ErrorDto> handleSteamIdInvalidException(SteamIdInvalidException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalDateFormatException.class)
    public ResponseEntity<ErrorDto> handleIllegalDateFormatException(IllegalDateFormatException exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<Map<String, String>> errors = ex.getBindingResult().getFieldErrors().stream().map(error -> Map.of(error.getField(), error.getDefaultMessage())).toList();
        ErrorDto errorDto = new ErrorDto(HttpStatus.BAD_REQUEST.value(), "Validation failed", errors);
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleException(Exception exception) {
        ErrorDto errorDto = new ErrorDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage(), null);
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
