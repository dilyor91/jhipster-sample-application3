package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.StudyAtKorea;
import uz.tashkec.repository.StudyAtKoreaRepository;
import uz.tashkec.service.StudyAtKoreaService;
import uz.tashkec.service.dto.StudyAtKoreaDTO;
import uz.tashkec.service.mapper.StudyAtKoreaMapper;

/**
 * Service Implementation for managing {@link StudyAtKorea}.
 */
@Service
@Transactional
public class StudyAtKoreaServiceImpl implements StudyAtKoreaService {

    private final Logger log = LoggerFactory.getLogger(StudyAtKoreaServiceImpl.class);

    private final StudyAtKoreaRepository studyAtKoreaRepository;

    private final StudyAtKoreaMapper studyAtKoreaMapper;

    public StudyAtKoreaServiceImpl(StudyAtKoreaRepository studyAtKoreaRepository, StudyAtKoreaMapper studyAtKoreaMapper) {
        this.studyAtKoreaRepository = studyAtKoreaRepository;
        this.studyAtKoreaMapper = studyAtKoreaMapper;
    }

    @Override
    public StudyAtKoreaDTO save(StudyAtKoreaDTO studyAtKoreaDTO) {
        log.debug("Request to save StudyAtKorea : {}", studyAtKoreaDTO);
        StudyAtKorea studyAtKorea = studyAtKoreaMapper.toEntity(studyAtKoreaDTO);
        studyAtKorea = studyAtKoreaRepository.save(studyAtKorea);
        return studyAtKoreaMapper.toDto(studyAtKorea);
    }

    @Override
    public StudyAtKoreaDTO update(StudyAtKoreaDTO studyAtKoreaDTO) {
        log.debug("Request to update StudyAtKorea : {}", studyAtKoreaDTO);
        StudyAtKorea studyAtKorea = studyAtKoreaMapper.toEntity(studyAtKoreaDTO);
        studyAtKorea = studyAtKoreaRepository.save(studyAtKorea);
        return studyAtKoreaMapper.toDto(studyAtKorea);
    }

    @Override
    public Optional<StudyAtKoreaDTO> partialUpdate(StudyAtKoreaDTO studyAtKoreaDTO) {
        log.debug("Request to partially update StudyAtKorea : {}", studyAtKoreaDTO);

        return studyAtKoreaRepository
            .findById(studyAtKoreaDTO.getId())
            .map(existingStudyAtKorea -> {
                studyAtKoreaMapper.partialUpdate(existingStudyAtKorea, studyAtKoreaDTO);

                return existingStudyAtKorea;
            })
            .map(studyAtKoreaRepository::save)
            .map(studyAtKoreaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudyAtKoreaDTO> findAll() {
        log.debug("Request to get all StudyAtKoreas");
        return studyAtKoreaRepository.findAll().stream().map(studyAtKoreaMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StudyAtKoreaDTO> findOne(Long id) {
        log.debug("Request to get StudyAtKorea : {}", id);
        return studyAtKoreaRepository.findById(id).map(studyAtKoreaMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StudyAtKorea : {}", id);
        studyAtKoreaRepository.deleteById(id);
    }
}
