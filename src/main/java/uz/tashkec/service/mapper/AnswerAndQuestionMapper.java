package uz.tashkec.service.mapper;

import org.mapstruct.*;
import uz.tashkec.domain.AnswerAndQuestion;
import uz.tashkec.service.dto.AnswerAndQuestionDTO;

/**
 * Mapper for the entity {@link AnswerAndQuestion} and its DTO {@link AnswerAndQuestionDTO}.
 */
@Mapper(componentModel = "spring")
public interface AnswerAndQuestionMapper extends EntityMapper<AnswerAndQuestionDTO, AnswerAndQuestion> {}
