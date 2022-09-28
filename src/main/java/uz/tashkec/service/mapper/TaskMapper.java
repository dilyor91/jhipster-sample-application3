package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.Task;
import uz.tashkec.service.dto.TaskDTO;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {}
