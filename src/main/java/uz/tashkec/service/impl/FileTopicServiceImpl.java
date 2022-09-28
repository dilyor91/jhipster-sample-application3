package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.FileTopic;
import uz.tashkec.repository.FileTopicRepository;
import uz.tashkec.service.FileTopicService;
import uz.tashkec.service.dto.FileTopicDTO;
import uz.tashkec.service.mapper.FileTopicMapper;

/**
 * Service Implementation for managing {@link FileTopic}.
 */
@Service
@Transactional
public class FileTopicServiceImpl implements FileTopicService {

    private final Logger log = LoggerFactory.getLogger(FileTopicServiceImpl.class);

    private final FileTopicRepository fileTopicRepository;

    private final FileTopicMapper fileTopicMapper;

    public FileTopicServiceImpl(FileTopicRepository fileTopicRepository, FileTopicMapper fileTopicMapper) {
        this.fileTopicRepository = fileTopicRepository;
        this.fileTopicMapper = fileTopicMapper;
    }

    @Override
    public FileTopicDTO save(FileTopicDTO fileTopicDTO) {
        log.debug("Request to save FileTopic : {}", fileTopicDTO);
        FileTopic fileTopic = fileTopicMapper.toEntity(fileTopicDTO);
        fileTopic = fileTopicRepository.save(fileTopic);
        return fileTopicMapper.toDto(fileTopic);
    }

    @Override
    public FileTopicDTO update(FileTopicDTO fileTopicDTO) {
        log.debug("Request to update FileTopic : {}", fileTopicDTO);
        FileTopic fileTopic = fileTopicMapper.toEntity(fileTopicDTO);
        fileTopic = fileTopicRepository.save(fileTopic);
        return fileTopicMapper.toDto(fileTopic);
    }

    @Override
    public Optional<FileTopicDTO> partialUpdate(FileTopicDTO fileTopicDTO) {
        log.debug("Request to partially update FileTopic : {}", fileTopicDTO);

        return fileTopicRepository
            .findById(fileTopicDTO.getId())
            .map(existingFileTopic -> {
                fileTopicMapper.partialUpdate(existingFileTopic, fileTopicDTO);

                return existingFileTopic;
            })
            .map(fileTopicRepository::save)
            .map(fileTopicMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FileTopicDTO> findAll() {
        log.debug("Request to get all FileTopics");
        return fileTopicRepository.findAll().stream().map(fileTopicMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FileTopicDTO> findOne(Long id) {
        log.debug("Request to get FileTopic : {}", id);
        return fileTopicRepository.findById(id).map(fileTopicMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FileTopic : {}", id);
        fileTopicRepository.deleteById(id);
    }
}
