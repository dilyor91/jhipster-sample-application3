package uz.tashkec.service;

import java.util.List;
import java.util.Optional;
import uz.tashkec.service.dto.AnswerAndQuestionDTO;

/**
 * Service Interface for managing {@link uz.tashkec.domain.AnswerAndQuestion}.
 */
public interface AnswerAndQuestionService {
    /**
     * Save a answerAndQuestion.
     *
     * @param answerAndQuestionDTO the entity to save.
     * @return the persisted entity.
     */
    AnswerAndQuestionDTO save(AnswerAndQuestionDTO answerAndQuestionDTO);

    /**
     * Updates a answerAndQuestion.
     *
     * @param answerAndQuestionDTO the entity to update.
     * @return the persisted entity.
     */
    AnswerAndQuestionDTO update(AnswerAndQuestionDTO answerAndQuestionDTO);

    /**
     * Partially updates a answerAndQuestion.
     *
     * @param answerAndQuestionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AnswerAndQuestionDTO> partialUpdate(AnswerAndQuestionDTO answerAndQuestionDTO);

    /**
     * Get all the answerAndQuestions.
     *
     * @return the list of entities.
     */
    List<AnswerAndQuestionDTO> findAll();

    /**
     * Get the "id" answerAndQuestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnswerAndQuestionDTO> findOne(Long id);

    /**
     * Delete the "id" answerAndQuestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
