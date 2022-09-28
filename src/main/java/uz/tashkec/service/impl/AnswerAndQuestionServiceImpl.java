package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.AnswerAndQuestion;
import uz.tashkec.repository.AnswerAndQuestionRepository;
import uz.tashkec.service.AnswerAndQuestionService;
import uz.tashkec.service.dto.AnswerAndQuestionDTO;
import uz.tashkec.service.mapper.AnswerAndQuestionMapper;

/**
 * Service Implementation for managing {@link AnswerAndQuestion}.
 */
@Service
@Transactional
public class AnswerAndQuestionServiceImpl implements AnswerAndQuestionService {

    private final Logger log = LoggerFactory.getLogger(AnswerAndQuestionServiceImpl.class);

    private final AnswerAndQuestionRepository answerAndQuestionRepository;

    private final AnswerAndQuestionMapper answerAndQuestionMapper;

    public AnswerAndQuestionServiceImpl(
        AnswerAndQuestionRepository answerAndQuestionRepository,
        AnswerAndQuestionMapper answerAndQuestionMapper
    ) {
        this.answerAndQuestionRepository = answerAndQuestionRepository;
        this.answerAndQuestionMapper = answerAndQuestionMapper;
    }

    @Override
    public AnswerAndQuestionDTO save(AnswerAndQuestionDTO answerAndQuestionDTO) {
        log.debug("Request to save AnswerAndQuestion : {}", answerAndQuestionDTO);
        AnswerAndQuestion answerAndQuestion = answerAndQuestionMapper.toEntity(answerAndQuestionDTO);
        answerAndQuestion = answerAndQuestionRepository.save(answerAndQuestion);
        return answerAndQuestionMapper.toDto(answerAndQuestion);
    }

    @Override
    public AnswerAndQuestionDTO update(AnswerAndQuestionDTO answerAndQuestionDTO) {
        log.debug("Request to update AnswerAndQuestion : {}", answerAndQuestionDTO);
        AnswerAndQuestion answerAndQuestion = answerAndQuestionMapper.toEntity(answerAndQuestionDTO);
        answerAndQuestion = answerAndQuestionRepository.save(answerAndQuestion);
        return answerAndQuestionMapper.toDto(answerAndQuestion);
    }

    @Override
    public Optional<AnswerAndQuestionDTO> partialUpdate(AnswerAndQuestionDTO answerAndQuestionDTO) {
        log.debug("Request to partially update AnswerAndQuestion : {}", answerAndQuestionDTO);

        return answerAndQuestionRepository
            .findById(answerAndQuestionDTO.getId())
            .map(existingAnswerAndQuestion -> {
                answerAndQuestionMapper.partialUpdate(existingAnswerAndQuestion, answerAndQuestionDTO);

                return existingAnswerAndQuestion;
            })
            .map(answerAndQuestionRepository::save)
            .map(answerAndQuestionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnswerAndQuestionDTO> findAll() {
        log.debug("Request to get all AnswerAndQuestions");
        return answerAndQuestionRepository
            .findAll()
            .stream()
            .map(answerAndQuestionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AnswerAndQuestionDTO> findOne(Long id) {
        log.debug("Request to get AnswerAndQuestion : {}", id);
        return answerAndQuestionRepository.findById(id).map(answerAndQuestionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AnswerAndQuestion : {}", id);
        answerAndQuestionRepository.deleteById(id);
    }
}
